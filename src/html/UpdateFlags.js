/**
    Enumeration with possible update flag values for a UI element.
    
    These values can be combined, either by addition or by operator OR.
    
    For example, a UI element that its theme and layout state, can be updated with the flags
    
    @example
    UpdateFlags.THEME + UpdateFlags.LAYOUT
        
    @readonly
    @enum {number}
 */
export const UpdateFlags = Object.freeze({
    /** Redecorate the element because its theme was changed. */
    THEME  : 1,
    
    /** Reapply the layout because it was changed. */
    LAYOUT : 2,
    
    /** first flag value available for external code. */
    CUSTOM : 4,
    
    /** all update flags. */
    ALL    : 1 + 2,
});
