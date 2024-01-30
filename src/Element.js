import { isFirefox } from './init.js';

/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


//given a string of states, it returns an array of their values; 
//otherwise it returns undefined
const getStateArray = (state) => {
    const arr = state.split(',');
    return arr.length > 0 ? arr : undefined;
}


//add child side effects
const doChildAdditionSideEffects = (parent, child) => {
    //set the child as property of parent, based on name
    const name = child.getAttribute('name');
    if (name !== null) {
        parent[name] = child;
    }

    //inherit the theme
    if (parent.theme) {
        child.theme = parent.theme;
    }
}


//when a child is added, its effective state is updated; also, the parent gets the children as properties;
//when a child is removed, the parent no longer has the relevant children as properties;
//also, when a child is added and does not have a theme, and the parent has a theme,
//then the child gets the parent theme.
const addChildObserverCallback = (mutations) => {
    for(const mutation of mutations) {
        if (mutation.type === 'childList') {
            //children added
            mutation.addedNodes.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    updateEffectiveState(child);
                    doChildAdditionSideEffects(mutation.target, child);
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
addChildObserver.observe(document.body, { subtree: true, childList: true });


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
    //handle enabled/disabled
    if ((element.__ownState & State.ENABLED) === 0 || (parentEffectiveState & State.ENABLED) === 0) {
        element.setAttribute('disabled', '');
        element.__effectiveState = 0;
    }
    else {
        element.removeAttribute('disabled');
        element.__effectiveState = element.__ownState | parentEffectiveState;
    }

    //handle checked
    if ((element.__ownState & State.CHECKED) !== 0 || (parentEffectiveState & State.CHECKED) !== 0) {
        element.setAttribute('checked', '');
    }
    else {        
        element.removeAttribute('checked');
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
    let fullName = '';
    while (true) {
        fullName = element.getAttribute('name') + (fullName.length > 0 ? ('.' + fullName) : '');
        element = element.parentElement;
        if (element === document.body.parentElement || element === null) {
            break;
        }
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

    //name of the element
    Object.defineProperty(element, 'name', {
        configurable: false,
        enumerable: true,
        get: () => element.getAttribute('name'),
        set: (name) => element.setAttribute('name', name)
    })

    //theme storage
    Object.defineProperty(element, '__theme', {
        configurable: false,
        enumerable: false,
        value: undefined,
        writable: true
    })

    //theme property
    Object.defineProperty(element, 'theme', {
        configurable: true,
        enumerable: true,
        get: () => element.__theme,
        set: (theme) => {
            //set theme
            if (theme !== undefined && theme !== null) {
                element.__theme = theme;
                theme.applyToElement(element);
            }

            //remove theme
            else {
                if (element.__theme) {
                    element.__theme.undecorateElement(element);
                }
                element.__theme = undefined;
            }

            //apply theme to children
            for(let child = element.firstElementChild; child !== null; child = child.nextElementSibling) {
                child.theme = theme;
            }
        }
    })
}    


//activates the appropriate drag style according to the types of the data being transferred
const activateDragStyle = (event) => {
    const element = event.target;
    if (element.acceptedDroppedTypes) {
        for(const item of event.dataTransfer.items) {
            for(const acceptedDroppedType of element.acceptedDroppedTypes) {
                if (item.type.match(acceptedDroppedType)) {
                    element.addState(State.DRAG_ACCEPTED);
                    return;        
                }
            }
        }
    }
    element.addState(State.DRAG_DENIED);
}


//event handlers that add/remove the appropriate states, based on event type
function Element_onFocus() { this.addState(State.FOCUSED); }
function Element_onBlur() { this.removeState(State.FOCUSED); }; 
function Element_onMouseEnter() { this.addState(State.HIGHLIGHTED); }
function Element_onMouseLeave() { this.removeState(State.HIGHLIGHTED); }
function Element_onFocusIn() { this.addState(State.ACTIVE); }
function Element_onFocusOut() { this.removeState(State.ACTIVE); }
function Element_onDragEnter(e) { activateDragStyle(e); }
function Element_onDragOver(e) { activateDragStyle(e); }
function Element_onDragLeave() { this.removeState(State.DRAG_ACCEPTED | State.DRAG_DENIED); }
function Element_onDrop() { this.removeState(State.DRAG_ACCEPTED | State.DRAG_DENIED); }


//updates the event listeners required for managing states
const updateStateEventListeners = (element) => {
    //find out which state flags are set in styles
    let focused = 0;
    let highlighted = 0;
    let active = 0;
    let dragover = 0;
    for(const state in element.__styles) {
        focused |= state & State.FOCUSED;
        highlighted |= state & State.HIGHLIGHTED;
        active |= state & State.ACTIVE;
        dragover |= state & (State.DRAG_ACCEPTED | State.DRAG_DENIED);
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
    if (dragover) {
        element.addEventListener('dragenter', Element_onDragEnter);
        //firefox bug: when mouse enters text node under input, input receives dragleave
        if (isFirefox) {
            element.addEventListener('dragover', Element_onDragOver); 
        }
        element.addEventListener('dragleave', Element_onDragLeave);
        element.addEventListener('drop', Element_onDrop);
    }
    else {
        element.removeEventListener('dragenter', Element_onDragEnter);
        element.removeEventListener('dragover', Element_onDragOver);
        element.removeEventListener('dragleave', Element_onDragLeave);
        element.removeEventListener('drop', Element_onDrop);
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

    //sets the element properties
    element.setProperties = (properties) => setProperties(element, properties);

    //sets the element styles
    element.setStyles = (styles) => setStyles(element, styles);

    //sets the element events
    element.setEvents = (events) => setEvents(element, events);

    //apply decoration to element
    element.applyDecoration = (decoration) => {
        applyDecoration(element, decoration);
    }
}


//sets the defaults for an element
const setDefaults = (element) => {
    //properties
    element.className = 'Element';

    //layout-related functionality
    element.style.boxSizing = 'border-box';
    element.style.margin = '0';
    element.style.padding = '0';

    //drag-n-drop-related functionality
    if (element.tagName === 'INPUT') {
        element.acceptedDroppedTypes = ["text/plain"];
    }
}


//adds a class name
const appendClassName = (className, addition) => {
    if (className === undefined || className === null || className.length === 0) {
        return addition;
    }
    if (addition === undefined || addition === null || addition.length === 0) {
        return className;
    }
    return className + ' ' + addition;
}


//sets the object's properties; special attention is given to property 'style'
const setProperties = (element, properties) => {
    if (properties) {
        for(const propName in properties) {
            if (propName === 'style') {
                Object.assign(Element.style, properties[propName]);
            }
            else if (propName === 'name') {
                element.setAttribute('name', properties[propName]);
            }
            else if (propName === 'acceptedDroppedTypes') {
                element.acceptedDroppedTypes = properties[propName];
            }
            else if (propName === 'className') {
                element.className = appendClassName(element.className, properties[propName]);
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
            if (child.nodeType === Node.ELEMENT_NODE) {
                doChildAdditionSideEffects(element, child);
            }
        }
    }
}


//applies properties, styles and events to an element.
const applyDecoration = (element, {properties, style, styles, events}) => {
    Object.assign(element.style, style);
    setStyles(element, styles);
    updateStyleFromEffectiveState(element);
    updateStateEventListeners(element);
    setProperties(element, properties);
    setEvents(element, events);
}


/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


/**
 * The default element states.
 * It defines bitfield values which can be combined by + or | operation.
 * The states can be used to define styles per states.
 * The states are inherited by descentants: when a state is activated on a parent,
 * it also gets activated on children.
 */
export const State = Object.freeze({
    /**
     * The Disabled state.
     * This is the only state that cannot be combined with any other state,
     * since its value is 0.
     * It cannot be set directly, it can only be set when the enabled state is removed.
     */
    DISABLED: 0,

    /**
     * The Enabled state.
     * When set, the element's disabled attribute is set to false and vice versa.
     */
    ENABLED: 1 << 0,

    /**
     * The Focused state.
     * Activated when an element has the input focus.
     * When a style for this state is defined, the element automatically gets focus/blur events that set this state.
     */
    FOCUSED: 1 << 1,

    /**
     * THe Highlighted state.
     * Activated when the mouse is on top of an element, including its descentant elements.
     * Also known as 'hover'.
     * When a style for this state is defined, the element automatically gets mouseenter/mouseleave events that set this state.
     */
    HIGHLIGHTED: 1 << 2,

    /**
     * The Selected state.
     */
    SELECTED: 1 << 3,

    /**
     * The Pressed state.
     */
    PRESSED: 1 << 4,

    /**
     * The Checked state.
     * When set, the checked attribute is set, otherwise it is reset.
     */
    CHECKED: 1 << 5,

    /**
     * The active state.
     * An element is active if it contains an element that has the input focus,
     * or it has the input focus.
     * When a style for this state is defined, the element automatically gets focusin/focusout events that set this state.
     */
    ACTIVE : 1 << 6,

    /**
     * The error state.
     * It is used to signal to the user that the input is erroneous.
     */
    ERROR: 1 << 7,

    /**
     * The state when a drag is accepted.
     * A drag is accepted when one of the types specified in dataTransfer is found in the acceptedDroppedTypes list of an element.
     */
    DRAG_ACCEPTED: 1 << 8,

    /**
     * The state when a drag is denied.
     * A drag is denied the acceptedDroppedTypes list of an element does not contain any of the data types
     * specified in dataTransfer.
     */
    DRAG_DENIED: 1 << 9,

    /**
     * First user-available state.
     */
    USER: 1 << 10
});


/**
 * Event fired when the state of an element actually changes.
 * The event gets a property 'state', which reflects the final state of an element,
 * as affected by its own state and by the state of its ancestors.
 */
export class StateChangedEvent extends Event {
    constructor(state) {
        super('stateChanged');
        this.state = state;
    }
}


/**
 * Creates an element.
 * 
 * Example:
 * 
 *  Element('button', {
 *      properties: {
 *          name: 'foo',
 *          className: 'bar',
 *      },
 *      style: {
 *          color: 'blue',
 *          backgroundColor: 'red',
 *      },
 *      styles: {
 *          [State.DISABLED]: {
 *              backgroundColor: 'grey',
 *          },
 *          [State.ENABLED]: {
 *              backgroundColor: 'white',
 *          }
 *          [State.ENABLED + State.HIGHLIGHTED]: {
 *              backgroundColor: 'cyan',
 *          }
 *      },
 *      events: {
 *          'click': (event) => console.log("Element was clicked"),
 *          'mousedown': {
 *              listener: (event) => console.log("Element was pressed"),
 *              options: {},
 *          },
 *          'mouseup': {
 *              listener: (event) => console.log("Element not pressed"),
 *              useCapture: true,
 *          }
 *      }},
 *      "This is content"
 *      )
 * 
 * The Element function can be used to specify:
 * 
 *  -the element properties; these have the same names as the element properties and take the same value.
 *   Additional properties are:
 *      -state: returns or sets the own state of the element.
 *      -enabled: sets the 'disabled' attribute of the element.
 *      -name: sets the 'name' attribute of the element.
 *      -fullName: read-only property that returns the full name of the element, up to document.body.
 *      -theme: retrieves or sets the current object theme.
 *      -acceptedDroppedTypes: array of types the element accepts through drag-n-drop.
 * 
 *  -the element style; the style object can include any property of CSSStyleDeclaration.
 * 
 *  -the element styles; they are a map of states to style objects.
 *      This allows the specification of styles for a specific state.
 * 
 *  -the event handlers; these can be functions or objects with the following fields:
 *      {
 *          listener: function
 *          options: same options as defined in function 'addEventListener'; optional.
 *          useCapture: useCapture flag, as defined in function 'addEventListener'; optional.
 *      }
 * 
 * Furthermore, an Element gets several methods which are used to enhance an html element with increased functionality:
 * 
 *      -addState(State):
 *          Adds a state to an object. For example, in order to make an element selected, the following code is used:
 *              element.addState(State.SELECTED);
 *          The state parameter is a bitfield that can accept multiple states. For example:
 *              element.addState(State.SELECTED | State.HIGHLIGHTED);
 *          The element's style is automatically modified to reflect the new state,
 *          provided that a style is defined for that state.
 * 
 *      -removeState(State):
 *          Removes states from an object. Example:
 *              element.removeState(State.SELECTED | State.HIGHLIGHTED);
 *          The element's style is automatically modified to reflect the new state,
 *          provided that a style is defined for that state.
 * 
 *      -modifyState(stateToAdd, stateToRemove):
 *          Adds and removes states. Example:
 *              element.modifyState(State.HIGHLIGHTED, State.PRESSED);
 *          The element's style is automatically modified to reflect the new state,
 *          provided that a style is defined for that state.
 * 
 *      -getStyle(state):
 *          Returns a copy of the style object for the given state or undefined if there is no style object
 *          associated with that state.
 *          Example:
 *              const { backgroundColor } = element.getState(State.ENABLED | State.ACTIVE);
 *
 *      -setStyle(state, style):
 *          Replaces the style of a given state with a copy of the given style object.
 *          If the element does not have a style for the given state, then it is set.
 *          The element's style is automatically modified to reflect the current state,
 *          if the style for that state is being modified.
 *          Example:
 *              element.setStyle(State.ENABLED | State.ACTIVE, { backgroundColor: 'pink' });
 * 
 *      -modifyStyle(state, style):
 *          Modifies an existing style or sets the style for a state, if the given state 
 *          is not associated with a given style. 
 *          Example:
 *              element.modifyStyle(State.ENABLED | State.ACTIVE, { backgroundColor: 'pink' });
 * 
 *  Element states, where are used as parameters, can also be arrays of states. For example:
 *      element.setStyle([State.ENABLED | State.HIGHLIGHTED, State.ENABLED | State.FOCUSED], {...});
 *      Element('div', {styles: { [[State.ENABLED | State.HIGHLIGHTED, State.ENABLED | State.FOCUSED]] : {...}}})
 * 
 *  When an element gets a style for a state that requires event handlers in order to be activated,
 *  then these event handlers are automatically added. The following table shows which states
 *  add event handlers to elements:
 *      State.FOCUSED: focus/blur.
 *      State.HIGHLIGHTED: mouseenter/mouseleave.
 *      State.ACTIVE: focusin/focusout.
 *      State.DRAG_ACCEPTED, State.DRAG_DENIED: dragenter/dragover(*)/dragleave/drop.
 *      (*) The dragover handler is activated only on Firefox, because Firefox currently (as of Feb 2024)
 *      has the following bug: when the mouse cursor enters the text node of an input, the input gets a dragleave event.
 *  The above event handlers are automatically removed when there is no style associated with one of the above states.
 * 
 *  Elements that are children become properties of their parents, if they have a name.
 *  For example, if an element is named 'container' and a button inside it is named 'okButton',
 *  then the expression 'container.okButton' returns the button. Example:
 *      const parent = Element('div', { properties: { name: 'container'}}, Element('button', { properties: {name: 'okButton'}}));
 *      const button = parent.okButton;
 *  This is very useful for complex elements with a lot of descentants, because it allows easy access of children components
 *  via their name. 
 * 
 *  Elements have a 'theme' property which allows an element to style itself from a theme.
 *  Themes are inherited by children: when a theme is set on a parent element, the children
 *  also get the theme.
 *  In order to set a child's theme, first set the parent's theme and then the child's theme.
 * 
 * @param {string} tagName tag name of the element to pass to document.createElement.
 * @param {*} properties object with element properties; the element is initialized from these properties; optional.
 * @param {*} style object with element style properties; the element style is initialized from these properties; optional.
 * @param {*} styles object with states to element style properties object; these are the visual states of the element that 
 *  are activated when the element gets the relevant state.
 * @param {*} events object with event names to event handlers or to objects of the form {listener, options | useCapture}.
 * @param {boolean} debug optional flag that invokes the debugger, when set; useful for debugging of element creation.
 * @param {...any} children children components.
 * @returns the element.
 */
export const Element = (tagName, {properties, style, styles, events, debug}, ...children) => {
    if (debug) {
        debugger;
    }
    const element = document.createElement(tagName);
    defineProperties(element);
    defineMethods(element);
    setDefaults(element);
    applyDecoration(element, {properties, style, styles, events});
    addChildren(element, children);
    return element;
}
