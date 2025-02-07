/**
    Enumeration with possible state values for a UI element.
    
    These values can be combined, either by addition or by operator OR.
    
    For example, a UI element that is highlighted and pressed, is in state 
    
    @example
    StateFlags.HIGHLIGHTED + StateFlags.PRESSED
        
    @readonly
    @enum {number}
 */
export const StateFlags = Object.freeze({
    /** Disabled state. The element does not accept input. */
    DISABLED   : 1,
    
    /** Highlighted state. The element contains the mouse cursor. */
    HIGHLIGHTED: 2,
    
    /** Pressed state. The user holds a mouse button (or another device) pressed onto the element. */
    PRESSED    : 4,
    
    /** Selected state. The element represents a user selection. */
    SELECTED   : 8,
    
    /** Invalid state. The user has entered erroneous data. */
    INVALID    : 16,
    
    /** Focused state. The element has or is related to the input focus. */
    FOCUSED    : 32,
    
    /** first flag value available for external code. */
    CUSTOM     : 64
});
