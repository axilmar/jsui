/**
    Defines a pair of properties, a private part and a public part;
    the private part contains the value, the public part is the interface.
    @param object target object.
    @param name property name.
    @param value initial value.
    @param setter optional property setter; signature: (object, value) => void.
        If undefined, then the internal property is set directly.
        If null, then it is a read-only property.
 */
export const defineValueProperty = (object, name, value, setter = undefined) => {
    const privateName = '_' + name;
    
    //define the private part
    Object.defineProperty(object, privateName, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: true
    });
    
    //define the public part
    if (setter) {
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: true,
            get() { return this[privateName]; },
            set(newValue) { setter(this, newValue); }
        });
    }
    else if (setter === undefined) {
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: true,
            get() { return this[privateName]; },
            set(newValue) { this[privateName] = newValue; }
        });        
    }
    else {
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: true,
            get() { return this[privateName]; }
        });        
    }
}

/**
    defines a single property, which invokes the specific getters and setters.
    @param object target object.
    @param name property name.
    @param getter property getter; optional. Signature: (object) => value.
    @param setter property setter; optional. Signature: (object, value) => void.
    @throws Error if both getter and setter are invalid.
 */
export const defineInterfaceProperty = (object, name, getter, setter) => {
    if (getter && setter) {
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: true,
            get() { return getter(this); },
            set(newValue) { setter(this, newValue); }
        });
    }
    else if (getter) {
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: true,
            get() { return getter(this); }
        });        
    }
    else if (setter) {        
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: true,
            set(newValue) { setter(this, newValue); }
        });        
    }
    else {
        throw new Error('Invalid interface property definition; both getter and setter are undefined/null.');
    }
}

/**
    Checks if a property is read-only.
    @param object target object.
    @param propertyName name of the property.
    @param testValue value to use for testing; must be a valid type for this property.
    @return true if the property is read-only, false otherwise.
 */
export const isPropertyReadOnly = (object, propertyName, testValue) => {
    const hasProperty = propertyName in object;    
    
    //if the object does not have the property, then the property is read/write
    if (!hasProperty) {
        return true;
    }
    
    //get the property state
    const originalValue = object[propertyName];
    
    //try to set the property
    let result = false;
    try {
        object[propertyName] = testValue;
    }
    catch (e) {
        if (e instanceof TypeError) {
            result = true;
        }
    }
    
    //restore the property state
    object[propertyName] = originalValue;    
    
    return result;
}
