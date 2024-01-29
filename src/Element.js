import './init.js';

/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


//given a string of states, it returns an array of their values; 
//otherwise it returns undefined
const getStateArray = (state) => {
    const arr = state.split(',');
    return arr.length > 0 ? arr : undefined;
}


//when a child is added, its effective state is updated; also, the parent gets the children as properties;
//when a child is removed, the parent no longer has the relevant children as properties
const addChildObserverCallback = (mutations) => {
    for(const mutation of mutations) {
        if (mutation.type === 'childList') {
            //children added
            mutation.addedNodes.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    updateEffectiveState(child);
                    const name = child.getAttribute('name');
                    if (name !== null) {
                        mutation.target[name] = child;
                    }
                }
            });

            //children removed
            mutation.removedNodes.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const name = child.getAttribute('name');
                    if (name !== null) {
                        delete mutation.target[name];
                    }
                }
            });
        }
    }
}


//mutation observer used to monitor child insertions in order to setup their effective state
const addChildObserver = new MutationObserver(addChildObserverCallback);
addChildObserver.observe(document.body, { subTree: true, childList: true });


//returns the parent state of an element
const getParentState = (element) => {
    const parent = element.parentElement;

    //if it has no parent, then the parent element's state is enabled only
    if (parent === null) {
        return State.ENABLED;
    }

    //if the parent is the document body, also return enabled
    if (parent === document.body) {
        return State.ENABLED;
    }

    //return the parent's effective state
    return parent.__effectiveState;
}


//computes the effective state of an element
const computeEffectiveState = (element, parentEffectiveState) => {
    if ((element.__ownState & State.ENABLED) === 0 || (parentEffectiveState & State.ENABLED) === 0) {
        //element.setAttribute('disabled', '');
        element.__effectiveState = 0;
    }
    else {
        element.removeAttribute('disabled');
        element.__effectiveState = element.__ownState | parentEffectiveState;
    }
}


//updates the style of an element from its effective state
const updateStyleFromEffectiveState = (element) => {
    const style = element.__styles[element.__effectiveState];
    if (style) {
        Object.assign(element.style, style);
    }
}


//updates the style from effective state and also updates the effective state of children
const updateStyleAndEffectiveStateOfChildren = (element) => {
    //if there is no change in effective state, do nothing else
    if (element.__knownEffectiveState === element.__effectiveState) {
        return;
    }

    //save the effective state
    element.__knownEffectiveState = element.__effectiveState;

    //set the style from the effective state
    updateStyleFromEffectiveState(element);

    //update the effective state of children
    for(let child = element.firstElementChild; child !== null; child = child.nextElementSibling) {
        updateEffectiveStateHelper(child, element._effectiveState);
    }

    //fire the state changed event to allow users of element to 
    //alter the UI tree or do other actions if needed, based on state
    element.dispatchEvent(new StateChangedEvent(element.__effectiveState));
}


//updates the effective state of an element and its children, when the parent effective state is known
const updateEffectiveStateHelper = (element, parentEffectiveState) => {
    computeEffectiveState(element, parentEffectiveState);
    updateStyleAndEffectiveStateOfChildren(element);
}


//updates the effective state of an element and its children
const updateEffectiveState = (element) => {
    computeEffectiveState(element, getParentState(element));
    updateStyleAndEffectiveStateOfChildren(element);
}


//returns the full name of the element
const getElementFullName = (element) => {
    let fullName = element.name;
    for(element = element.parentElement; element !== document.body; element = element.parentElement) {
        fullName = element.name + '.' + fullName;
    }
    return fullName;
}


//defines the basic properties of every element
const defineProperties = (element) => {
    //defines the element's own properties
    Object.defineProperty(element, '__ownState', {
        configurable: false,
        enumerable: false,
        value: State.ENABLED,
        writable: true
    })

    //defines the combination of self and tree properties
    Object.defineProperty(element, '__effectiveState', {
        configurable: false,
        enumerable: false,
        value: State.ENABLED,
        writable: true
    })

    //last known effective state
    Object.defineProperty(element, '__knownEffectiveState', {
        configurable: false,
        enumerable: false,
        value: State.ENABLED,
        writable: true
    })

    //styles storage
    Object.defineProperty(element, '__styles', {
        configurable: false,
        enumerable: false,
        value: {},
        writable: false
    })

    //state property; returns own state, sets own state, but only if enabled
    Object.defineProperty(element, 'state', {
        configurable: false,
        enumerable: true,
        get: () => element.__ownState,
        set: (newState) => {
            if (newState !== element.__ownState) {
                element.__ownState = newState;
                updateEffectiveState(element);
            }
        }
    })

    //the enabled property
    Object.defineProperty(element, 'enabled', {
        configurable: false,
        enumerable: true,
        get: () => (element.__ownState & State.ENABLED) === 0,
        set: (v) => { v ? element.addState(State.ENABLED) : element.removeState(State.ENABLED) }
    })

    //the disabled property; the logical negation of the enabled property value
    Object.defineProperty(element, 'disabled', {
        configurable: false,
        enumerable: true,
        get: () => !element.enabled,
        set: (v) => element.enabled = !v
    })

    //returns the full name of the element, i.e. x.y.z.
    Object.defineProperty(element, 'fullName', {
        configurable: false,
        enumerable: true,
        get: () => getElementFullName(element)
    })
}    


//event handlers that add/remove the appropriate states, based on event type
function Element_onFocus() { this.addState(State.FOCUSED); }
function Element_onBlur() { this.removeState(State.FOCUSED); }; 
function Element_onMouseEnter() { this.addState(State.HIGHLIGHTED); }
function Element_onMouseLeave() { this.removeState(State.HIGHLIGHTED); }
function Element_onFocusIn() { this.addState(State.ACTIVE); }
function Element_onFocusOut() { this.removeState(State.ACTIVE); }


//updates the event listeners required for managing states
const updateStateEventListeners = (element) => {
    //find out which state flags are set in styles
    let focused = 0;
    let highlighted = 0;
    let active = 0;
    for(const state in element.__styles) {
        focused |= state & State.FOCUSED;
        highlighted |= state & State.HIGHLIGHTED;
        active |= state & State.ACTIVE;
    }

    //setup handlers
    if (focused) {
        element.addEventListener('focus', Element_onFocus);
        element.addEventListener('blur', Element_onBlur);
    }
    else {
        element.removeEventListener('focus', Element_onFocus);
        element.removeEventListener('blur', Element_onBlur);
    }
    if (highlighted) {
        element.addEventListener('mouseenter', Element_onMouseEnter);
        element.addEventListener('mouseleave', Element_onMouseLeave);
    }
    else {
        element.removeEventListener('mouseenter', Element_onMouseEnter);
        element.removeEventListener('mouseleave', Element_onMouseLeave);
    }
    if (active) {
        element.addEventListener('focusin', Element_onFocusIn);
        element.addEventListener('focusout', Element_onFocusOut);
    }
    else {
        element.removeEventListener('focusin', Element_onFocusIn);
        element.removeEventListener('focusout', Element_onFocusOut);
    }
}


//define the methods of the element
const defineMethods = (element) => {
    //add state to element
    element.addState = (newState) => {
        element.state = element.state | newState;
    }

    //remove state from element
    element.removeState = (newState) => {
        element.state = (element.state | newState) ^ newState;
    }

    //add/remove state from element
    element.modifyState = (stateToAdd, stateToRemove) => {
        element.state = (element.state | stateToAdd | stateToRemove) ^ stateToRemove;
    }

    //get style object from the element, for the given state
    element.getStyle = (state) => {
        const style = element.__styles[state];
        if (style) {
            return Object.assign({}, style);
        }
        return undefined;
    }

    //set style from state; if style is undefined/null, then the style is removed
    element.setStyle = (state, style) => {
        if (style !== undefined && style !== null) {
            setStateStyle(element, state, style);
        }
        else {
            const stateArray = getStateArray(state);
            if (stateArray) {
                for(const stateValue of stateArray) {
                    delete element.__styles[stateValue];
                }
            }
            else {
                delete element.__styles[state];
            }
        }

        //update the listeners, based on styles
        updateStateEventListeners(element);
    }

    //adds the properties of the given style to an existing style
    element.modifyStyle = (state, style) => {
        const stateArray = getStateArray(state);
        if (stateArray) {
            for(const stateValue of stateArray) {
                element.setStyle(stateValue, Object.assign({}, element.__styles[stateValue], style));
            }
        }
        else {
            element.setStyle(state, Object.assign({}, element.__styles[state], style));
        }
    }
}


//sets the defaults for an element
const setDefaults = (element) => {
    element.style.boxSizing = 'border-box';
    element.style.margin = '0';
    element.style.padding = '0';
}


//sets the object's properties; special attention is given to property 'style'
const setProperties = (element, properties) => {
    if (properties) {
        for(const propName in properties) {
            if (propName === 'style') {
                Object.assign(Element.style, properties[propName]);
            }
            else {
                element[propName] = properties[propName];
            }
        }
    }
}


//set the state style either from single state value
const setSingleStateStyle = (element, state, style) => {
    element.__styles[state] = Object.assign({}, style);
    if (element.__effectiveState === state) {
        updateStyleFromEffectiveState(element);
    }
}


//sets the element's style either from array or from single value
const setStateStyle = (element, state, styles) => {
    const stateArray = getStateArray(state);
    if (stateArray) {
        for(const stateValue of stateArray) {
            setSingleStateStyle(element, stateValue, styles[state]);
        }
    }
    else {
        setSingleStateStyle(element, state, styles[state]);
    }
}


//sets the object's styles; style objects are copied into the object;
//updates the current style, if needed;
//sets up handlers so as that the focused, highlighted and active states
//are added on focus/mouseenter/focusin and removed on blur/mouseleave/focusout events;
//the state can be an array, which is expanded to multiple states.
const setStyles = (element, styles) => {
    if (styles) {
        for(const state in styles) {
            setStateStyle(element, state, styles);
        }
    }
    updateStateEventListeners(element);
}


//adds event listeners to the element; events can be { listener, options || useCapture } objects or functions.
const setEvents = (element, events) => {
    if (events) {
        for(const eventName in events) {
            const event = events[eventName];
            if (event.listener) {
                element.addEventListener(eventName, event.listener, event.options || event.useCapture);
            }
            else {
                element.addEventListener(eventName, event);
            }
        }
    }
}


//adds children
const addChildren = (element, children) => {
    if (children) {
        for(const child of children) {
            element.append(child);
        }
    }
}


/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


export const State = Object.freeze({
    DISABLED    : 0,
    ENABLED     : 1 << 0,
    FOCUSED     : 1 << 1,
    HIGHLIGHTED : 1 << 2,
    SELECTED    : 1 << 3,
    PRESSED     : 1 << 4,
    CHECKED     : 1 << 5,
    ACTIVE      : 1 << 6,
    ERROR       : 1 << 7,
    USER        : 1 << 8
});


export class StateChangedEvent extends Event {
    constructor(state) {
        super('stateChanged');
        this.state = state;
    }
}


export const Element = (tagName, {debug, properties, style, styles, events}, ...children) => {
    if (debug) {
        debugger;
    }
    const element = document.createElement(tagName);
    defineProperties(element);
    defineMethods(element);
    setDefaults(element);
    Object.assign(element.style, style);
    setStyles(element, styles);
    updateStyleFromEffectiveState(element);
    updateStateEventListeners(element);
    setProperties(element, properties);
    setEvents(element, events);
    addChildren(element, children);
    return element;
}