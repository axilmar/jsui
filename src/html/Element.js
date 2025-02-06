import { Object as JSUIObject } from '../core/Object.js';
import { defineValueProperty, defineInterfaceProperty } from '../core/properties.js';
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

//execute function for the children elements of an element;
//if the function returns true, then stop.
const forAnyChild = (parentElement, func) => {
    const children = parentElement.children;
    for(let index = 0; index < children.length; ++index) {
        const child = children.item(index);
        if (func(child)) {
            return true;
        }
    }
    return false;
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
        const oldState = element._state;
        element._state = newState;
        element.onStateChanged?.(oldState, element._state);
        updateTreeState(element, element.parentElement?._treeState || 0);
    }
}

//mutation observer callback
const mutationObserverCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    updateTreeState(node, node.parentElement._treeState);
                    node.theme = node.parentElement.theme;
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
};

//mutation observer options
const mutationObserverOptions = { attributes: true, attributeFilter: ['disabled'], childList: true, subtree: false };

//monitor element for changes
const UITreeObserver = new MutationObserver(mutationObserverCallback);

//observe the predefined elements for changes
UITreeObserver.observe(document.documentElement, mutationObserverOptions);
UITreeObserver.observe(document.body, mutationObserverOptions);

//get/set highlighted state
const getHighlightedState = (element) => hasFlags(element._state, State.HIGHLIGHTED);
const setHighlightedState = (element, newValue) => setState(element, computeFlags(element._state, State.HIGHLIGHTED, newValue));

//the mouse enter handler turns the highlighted state to true
function mouseEnterHandler(event) {
    this.highlighted = true;
}

//the mouse leave handler turns the highlighted state to false
function mouseLeaveHandler(event) {
    this.highlighted = false;
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
function mouseDownHandler(event) {
    this.pressed = true;
    document.addEventListener('mouseup', () => this.pressed = false, { once: true });
}

//set the pressable property; only the mouse down handler is registered,
//because the mouseup happens anywhere on the screen
const setPressable = (element, newValue) => {
    if (newValue !== element._focusable) {
        element._pressable = newValue;
        if (newValue) {
            element.addEventListener('mousedown', mouseDownHandler);
        }
        else {
            element.removeEventListener('mousedown', mouseDownHandler);
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
function focusInHandler(event) {
    this.focused = true;
}

//the focusout handler turns the focused state to false
function focusOutHandler(event) {
    this.focused = false;
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

//the contains element function
function containsElementFunction(subElement) {
    if (subElement) {
        for(let element = subElement; element; element = element.parentElement) {
            if (element === this) {
                return true;
            }
        }
    }
    return false;
}

//a enhanced focus function that can move the input focus to the first focusable descendant element
function focusFunction() {
    //try focusing this first; if it succeeds, do nothing else
    this._originalFocus();
    if (document.activeElement === this) {
        return;
    }
    
    //try focusing children
    forAnyChild(this, (child) => {
        child.focus();
        return child.containsElement?.(document.activeElement);
    });
}

//an enhanced blur function that knows how to remove a focus from a container
function blurFunction() {
    if (this.containsElement?.(document.activeElement)) {
        document.activeElement._originalBlur();
    }
}

//set the element's layout
const setLayout = (element, newLayout) => {
    element._layout = newLayout;
    if (newLayout) {
        newLayout.apply(element);
    }
}

//the redecorate function
function redecorateFunction() {
    if (this._theme) {
        redecorateElement(element, element._treeState, element._treeState);
    }
}

//set the attributes
const setAttributes = (element, attributes) => {
    for(const attribute of attributes) {
        element.setAttribute(attribute.name, attribute.value);
    }
}

//set the children
const setChildren = (element, children) => {
    if (Array.isArray(children)) {
        element.replaceChildren(...children);
    }
    else {
        element.replaceChildren(children);        
    }
}

//get parent
const getParent = (element) => element.parentElement;

//set parent
const setParent = (element, parent) => parent.append(element);

//set the style
const setStyle = (element, style) => {
    for(const stylePropertyName in style) {
        element.style[stylePropertyName] = style[stylePropertyName];
    }
}

//the element constructor function
function elementConstructorFunction() {
    //define new properties
    defineValueProperty(this, 'state', 0, setState);
    defineValueProperty(this, 'treeState', 0);
    defineInterfaceProperty(this, 'highlighted', getHighlightedState, setHighlightedState);
    defineValueProperty(this, 'highlightable', false, setHighlightable);
    defineInterfaceProperty(this, 'pressed', getPressedState, setPressedState);
    defineValueProperty(this, 'pressable', false, setPressable);
    defineInterfaceProperty(this, 'selected', getSelectedState, setSelectedState);
    defineInterfaceProperty(this, 'invalid', getInvalidState, setInvalidState);
    defineInterfaceProperty(this, 'focused', getFocusedState, setFocusedState);
    defineValueProperty(this, 'focusable', false, setFocusable);
    defineValueProperty(this, 'theme', undefined, setTheme);
    defineValueProperty(this, 'layout', undefined, setLayout);
    
    //define enabled property which is the opposite of disabled property
    defineInterfaceProperty(this, 'enabled', getEnabledState, setEnabledState);
    
    //if the this does not have a disabled property, then add one which sets its state to DISABLED.
    const hasDisabled = 'disabled' in this;
    Object.defineProperty(this, '_hasDisabled', { configurable: false, enumerable: false, value: hasDisabled, writable: false });
    if (!hasDisabled) {
        defineInterfaceProperty(this, 'disabled', getDisabledState, setDisabledState);
    }
    
    //add a containsElement function
    this.containsElement = containsElementFunction;
    
    //define custom focus and blur functions that work on containers
    const originalFocus = this.focus;
    Object.defineProperty(this, '_originalFocus', { configurable: false, enumerable: false, value: originalFocus, writable: false });
    const originalBlur = this.blur;
    Object.defineProperty(this, '_originalBlur', { configurable: false, enumerable: false, value: originalBlur, writable: false });
    this.focus = focusFunction;
    this.blur = blurFunction;
    
    //define the redecorate function
    this.redecorate = redecorateFunction;
    
    //monitor this element for changes
    UITreeObserver.observe(this, mutationObserverOptions);
    
    //define the attributes property
    const attributes = this.attributes;
    defineInterfaceProperty(this, 'attributes', () => attributes, setAttributes);
    
    //define the children property
    const children = this.children;
    defineInterfaceProperty(this, 'children', () => children, setChildren);
    
    //define the parent property
    defineInterfaceProperty(this, 'parent', getParent, setParent);    
    
    //define the style property
    const style = this.style;
    defineInterfaceProperty(this, 'style', () => style, setStyle);    
}

/**
    Creates an element.
    
    <h3>Properties</h3>

    The following properties are added to an element:
    
        - state: a combination of flags that reflect the state of the element (see State enumeration for possible values). 
            0 by default.
        
        - treeState: a read-only value that combines the tree state of the parent element to the state of the element. 
            0 by default.
        
        - highlighted: when set, the element is in highlighted state. 
            False by default.
        
        - highlightable: when set, the element gets mouseenter/mouseleave handlers which set and reset the highlighted state accordingly. 
            False by default.
        
        - pressed: when set, the element is in pressed state. 
            False by default.
        
        - pressable: when set, the element gets mousedown/mouseup (on document) handlers which set and reset the pressed state accordingly. 
            False by default.
        
        - invalid: when set, the element is in invalid state (used to indicate an input error). 
            False by default.
        
        - focused: when set, the element either has or contains the input focus. 
            False by default.
        
        - focusable: when set, the element gets the focused state, if a descentant element gets the input focus. 
            False by default.
        
        - enabled: the opposite of disabled. 
            True by default.
        
        - disabled: for elements that do not have a disabled property, this sets the disabled state for them.
            Elements with a disabled property get the disabled state through attribute monitoring (via MutationObserver).
            False by default.
            
        - theme: when set, an element is decorated by the given theme; decoration happens according to class list 
          and object type of an element. Undefined by default.
          
        - layout: It allows an element to have a layout algorithm applied to them. 
            The layout object must have the method <code>apply(element)</code>.
            
        - attributes: It makes the attributes property writable; if assigned a set of key/value pairs,
            then the element's 'setAttribute' method is invoked for each pair.
            
        - children: makes the property read/write. When set, all the existing children are removed,
            and the new set of children are added from the given array.
            
        - parent: synonymous to parentElement; when set, the child is appended to the parent.
        
        - style: makes the style property writable; when set, the internal style object of the element
            is assigned the properties of the object.
      
    <h3>Methods</h3>

    The following methods are added to an element:
    
        - containsElement(element):
            returns true when the given element is or is contained into the target element.
            
        - focus():
            If the element is not focusable, then calling focus() on it sets the focus to its first focusable element.
            
        - blur():
            If the target element contains the active element, then blur() is called on the active element.
            Otherwise, nothing happens.
            
        - redecorate():
            If the element has a theme associated with it, then the theme is invoked to redecorate the element,
            in the element's current tree state.
            
    <h3>Callbacks</h3>

    The following optional callback methods are available:
    
        - onStateChanged(oldState, newState):
            Invoked when the state of an object is modified.
            The parameter 'oldState' is the old state of the element.
            The parameter 'newState' is the current state of the element.

        - onTreeStateChanged(oldTreeState, newTreeState):
            Invoked when the tree state of an object is modified.
            The parameter 'oldTreeState' is the old tree state of the element.
            The parameter 'newTreeState' is the current tree state of the element.
            
    <h3>UI Tree Runtime State/Theme Inheritance</h3>

    States of an element are 'inherited' by descendant elements.
    For example, if an anscestor element becomes disabled, then all descentants become disabled.
    If an ancestor becomes highlighted, then all descendants also become highlighted.
    If an ancestor becomes invalid, then all descendants also become invalid etc.
    
    This allows the state of a container to be reflected to all its descentants, thus allowing
    complex elements with many sub-elements to form a single coherent widget.
    
    Also, If a theme is set on an ancestor element, all children get the same theme.
    
    Children inherit the state and theme of the parent as they are added to a parent element.
    
    <h3>Theming</h3>

    A theme that is assigned to an element must provide the following interface:
    
        - decorateElement: decorate function. Signature: (element, newTreeState) : void.
            Invoked each time an element should be decorated.
            The parameter 'newTreeState' is the current tree state of the given element.
        
        - undecorateElement: undecorate function. Signature: (element, oldTreeState) : void.
            Invoked each time an element should be undecorated. Optional.
            The parameter 'oldTreeState' is the previous tree state of the given element.
            
        - redecorateElement: redecorate function. Signature: (element, oldTreeState, newTreeState) : void.
            Invoked each time an element should be redecorated.
            This function is optional; if not specified, then undecorate(element, oldTreeState) will be called, 
            followed by decorate(element, newTreeState).
            The parameter 'newTreeState' is the current tree state of the given element.
            The parameter 'oldTreeState' is the previous tree state of the given element.
            
    <h3>Examples</h3>
    
        @example
        //create a simple element.
        Element(document.createElement('div'));
        
        @example
        //create an element with a single properties object.
        Element(document.createElement('div'), 
            { className: 'div', style: { backgroundColor: 'red', width: '32px', height: '32px' }}
            );
        
        @example
        //create an element with a multiple properties objects and some children.
        Element(document.createElement('div'), 
            { className: 'div1', style: { backgroundColor: 'red', width: '32px', height: '32px' }},
            { className: 'div2', style: { display: flex, alignItems: 'center' }, children: [ document.createElement('input') ]},
            );
        
        @example
        //create an element with a multiple properties objects and some children, and a constructor.
        Element(document.createElement('div'), 
            { className: 'div1', style: { backgroundColor: 'red', width: '32px', height: '32px' }},
            { className: 'div2', constructor: div2_constructor, style: { display: flex, alignItems: 'center' }, children: [ document.createElement('input') ]},
            );
        
    @param element element to construct.    
    @param properties array of objects with element properties. 
    @return the element.
    
 */
export const Element = (element, ...properties) => {
    return JSUIObject(element, { constructor: elementConstructorFunction, className: 'Element' }, ...properties);
}

//initialize the document element (html) as an Element, in order to:
//a) make it have the additional functionalities elements have,
//b) make it full screen
Element(document.documentElement, { 
    className: 'html',
    style: { 
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0
    } 
});

//since document has property 'body', it shall also have property 'html'
document.html = document.documentElement;

//initialize the document body as an Element, in order to:
//a) make it have the additional functionalities elements have,
//b) make it full screen
Element(document.body, { 
    className: 'body',
    style: { 
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0
    } 
});

//since document has property 'body', document.html shall have property body
document.html.body = document.body;

//add a global style for all elements;
//the box-sizing must be border-box, as it makes size calculations much easier;
//and overflow must be hidden.
const globalStyle = document.createElement('style');
globalStyle.innerHTML = '* { box-sizing: border-box; overflow: hidden; }';
document.head.appendChild(globalStyle);
