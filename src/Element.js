import { State } from './State.js';

//computes a new flags value
const computeFlags = (existingValue, newValue, set) => {
    return set ? (existingValue | newValue) : ((existingValue | newValue) ^ newValue);
}

//checks if flags are set
const hasFlags = (value, flags) => (value & flags) === flags;

//execute function for the children elements of an element
const forEachChild = (parentElement, func) => {
    const children = parentElement.children;
    for(let index = 0; index < children.length; ++index) {
        const child = children.item(index);
        func(child);
    }
}

//calls the appropriate redecorateElement/decorateElement/undecorateElement functions for the given theme, element and tree states
const redecorateElement = (element, oldTreeState, newTreeState) => {
    if (element._theme) {
        if (element._theme.redecorateElement) {
            element._theme.redecorateElement(element, oldTreeState, element._treeState);
        }
        else {
            element._theme.undecorateElement?.(element, oldTreeState);
            element._theme.decorateElement(element, element._treeState);                
        }
    }    
}

//sets the tree state of an object; if it differs from the current tree state,
//a callback is invoked to allow the object to change its visual state according to the new tree state
const setTreeState = (element, treeState) => {
    const newTreeState = treeState | element._state;
    if (newTreeState !== element._treeState) {
        const oldTreeState = element._treeState;
        element._treeState = newTreeState;
        if (element._hasDisabled) {
            element.disabled = hasFlags(element._treeState, State.DISABLED);
        }
        redecorateElement(element, oldTreeState, element._treeState);
        element.onTreeStateChanged?.(oldTreeState, element._treeState);
        return true;
    }
    return false;
}

//updates the tree state of each descendant element in the UI tree
const updateTreeState = (element, parentTreeState) => {
    if (setTreeState(element, parentTreeState)) {
        forEachChild(element, (child) => updateTreeState(child, element._treeState));
    }
}

//sets the state of an object
const setState = (element, newState) => {
    if (newState !== element._state) {
        element._state = newState;
        updateTreeState(element, element.parentElement?._treeState || 0);
    }
}

//setup an observer that changes a UI tree's treeState flags, based on parent/child relationship
const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    updateTreeState(node, node.parentElement._treeState);
                }
            });
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    updateTreeState(node, 0);
                }
            });
        }
        else if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'disabled') {
                const element = mutation.target;
                setState(element, computeFlags(element._state, State.DISABLED, element.disabled));
            }
        }
    }
});
observer.observe(document.body, { attributes: true, attributeFilter: ['disabled'], childList: true, subtree: true });

//defines a pair of properties, a private part and a public part;
//the private part contains the value, the public part is the interface
const defineValueProperty = (element, name, value, setter) => {
    const privateName = '_' + name;
    
    //define the private part
    Object.defineProperty(element, privateName, {
        configurable: false,
        enumerable: false,
        value: value,
        writable: true
    });
    
    //define the public part
    if (setter) {
        Object.defineProperty(element, name, {
            configurable: false,
            enumerable: true,
            get() { return this[privateName]; },
            set(newValue) { setter(this, newValue); }
        });
    }
    else {
        Object.defineProperty(element, name, {
            configurable: false,
            enumerable: true,
            get() { return this[privateName]; }
        });        
    }
}

//defines a single property, which invokes the specific getters and setters
const defineInterfaceProperty = (element, name, getter, setter) => {
    if (getter && setter) {
        Object.defineProperty(element, name, {
            configurable: false,
            enumerable: true,
            get() { return getter(this); },
            set(newValue) { setter(this, newValue); }
        });
    }
    else if (getter) {
        Object.defineProperty(element, name, {
            configurable: false,
            enumerable: true,
            get() { return getter(this); }
        });        
    }
    else if (setter) {        
        Object.defineProperty(element, name, {
            configurable: false,
            enumerable: true,
            set(newValue) { setter(this, newValue); }
        });        
    }
    else {
        throw new Error('Invalid interface property definition; both getter and setter are undefined/null.');
    }
}

//get/set highlighted state
const getHighlightedState = (element) => hasFlags(element._state, State.HIGHLIGHTED);
const setHighlightedState = (element, newValue) => setState(element, computeFlags(element._state, State.HIGHLIGHTED, newValue));

//the mouse enter handler turns the highlighted state to true
const mouseEnterHandler = (event) => {
    event.target.highlighted = true;
}

//the mouse leave handler turns the highlighted state to false
const mouseLeaveHandler = (event) => {
    event.target.highlighted = false;
}

//set the highlightable property
const setHighlightable = (element, newValue) => {
    if (newValue !== element._highlightable) {
        element._highlightable = newValue;
        if (newValue) {
            element.addEventListener('mouseenter', mouseEnterHandler);
            element.addEventListener('mouseleave', mouseLeaveHandler);
        }
        else {
            element.removeEventListener('mouseenter', mouseEnterHandler);
            element.removeEventListener('mouseleave', mouseLeaveHandler);
        }
    }
}

//get/set pressed state
const getPressedState = (element) => hasFlags(element._state, State.PRESSED);
const setPressedState = (element, newValue) => setState(element, computeFlags(element._state, State.PRESSED, newValue));

//the mouse down handler turns the pressed state to true
const mouseDownHandler = (event) => {
    event.target.pressed = true;
}

//the mouse up handler turns the pressed state to false
const mouseUpHandler = (event) => {
    event.target.pressed = false;
}

//set the pressable property
const setPressable = (element, newValue) => {
    if (newValue !== element._focusable) {
        element._pressable = newValue;
        if (newValue) {
            element.addEventListener('mousedown', mouseDownHandler);
            element.addEventListener('mouseup', mouseUpHandler);            
        }
        else {
            element.removeEventListener('mousedown', mouseDownHandler);
            element.removeEventListener('mouseup', mouseUpHandler);            
        }
    }
}

//get/set selected state
const getSelectedState = (element) => hasFlags(element._state, State.SELECTED);
const setSelectedState = (element, newValue) => setState(element, computeFlags(element._state, State.SELECTED, newValue));

//get/set invalid state
const getInvalidState = (element) => hasFlags(element._state, State.INVALID);
const setInvalidState = (element, newValue) => setState(element, computeFlags(element._state, State.INVALID, newValue));

//get/set focused state
const getFocusedState = (element) => hasFlags(element._state, State.FOCUSED);
const setFocusedState = (element, newValue) => setState(element, computeFlags(element._state, State.FOCUSED, newValue));

//the focusin handler turns the focused state to true
const focusInHandler = (event) => {
    event.target.focused = true;
}

//the focusout handler turns the focused state to false
const focusOutHandler = (event) => {
    event.target.focused = false;
}

//set the focusable property
const setFocusable = (element, newValue) => {
    if (newValue !== element._focusable) {
        element._focusable = newValue;
        if (newValue) {
            element.addEventListener('focusin', focusInHandler);
            element.addEventListener('focusout', focusOutHandler);            
        }
        else {
            element.removeEventListener('focusin', focusInHandler);
            element.removeEventListener('focusout', focusOutHandler);
        }
    }
}

//set the theme of an element
const setTheme = (element, theme) => {
    if (element._theme !== theme) {
        element._theme?.undecorateElement?.(element, element._treeState);
        element._theme = theme;
        theme.decorateElement(element, element._treeState);
    }
    else if (theme) {
        redecorateElement(element, element._treeState, element._treeState);
    }
    forEachChild(element, (child) => setTheme(child, theme));
}

//get/set enabled state
const getEnabledState = (element) => !element.disabled;
const setEnabledState = (element, newValue) => element.disabled = !newValue;

//get/set disabled state (only for elements that do not have a native 'disabled' property)
const getDisabledState = (element) => hasFlags(element._state, State.DISABLED);
const setDisabledState = (element, newValue) => setState(element, computeFlags(element._state, State.DISABLED, newValue));

export const Element = (element, properties = {}) => {
    //define new properties
    defineValueProperty(element, 'state', 0, setState);
    defineValueProperty(element, 'treeState', 0);
    defineInterfaceProperty(element, 'highlighted', getHighlightedState, setHighlightedState);
    defineValueProperty(element, 'highlightable', false, setHighlightable);
    defineInterfaceProperty(element, 'pressed', getPressedState, setPressedState);
    defineValueProperty(element, 'pressable', false, setPressable);
    defineInterfaceProperty(element, 'selected', getSelectedState, setSelectedState);
    defineInterfaceProperty(element, 'invalid', getInvalidState, setInvalidState);
    defineInterfaceProperty(element, 'focused', getFocusedState, setFocusedState);
    defineValueProperty(element, 'focusable', false, setFocusable);
    defineValueProperty(element, 'theme', undefined, setTheme);
    
    defineInterfaceProperty(element, 'enabled', getEnabledState, setEnabledState);
    const hasDisabled = 'disabled' in element;
    Object.defineProperty(element, '_hasDisabled', { configurable: false, enumerable: false, value: hasDisabled, writable: false });
    if (!hasDisabled) {
        defineInterfaceProperty(element, 'disabled', getDisabledState, setDisabledState);
    }
    
    //init properties
    for(const propertyKey in properties) {
        const propertyValue = properties[propertyKey];
        
        switch (propertyKey) {
            case 'attributes':
                for(const attributeKey in propertyValue) {
                    element.setAttribute(attributeKey, propertyValue[attributeKey]);
                }
                break;
                
            case 'children':
                for(const child of propertyValue) {
                    element.appendChild(child);
                }
                break;
                
            case 'classList':
                element.className = propertyValue.join(' ');
                break;
            
            case 'parent':
            case 'parentElement':
                propertyValue.appendChild(element);
                break;
                
            case 'style':
                for(const stylePropertyKey in propertyValue) {
                    element.style[stylePropertyKey] = propertyValue[stylePropertyKey];
                }
                break;
                
            default:
                element[propertyKey] = propertyValue;
        }
    }
    
    return element;
}
