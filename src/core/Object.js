import { defineValueProperty, defineInterfaceProperty, isPropertyReadOnly } from './properties.js';

//sets the class name
const setClassName = (element, className) => {
    element._className = className;
}

//get the class list by splitting the class name.
const getClassList = (object) => {
    return object.className.split(' ');
}

//set the class list by setting the classname property.
const setClassList = (object, newClassList) => {
    object.className = newClassList.join(' ');
}

//the default object constructor.
function objectConstructor() {
    //define the className property, if not defined
    if (!('className' in this)) {
        defineValueProperty(this, 'className', '', setClassName);
    }
    
    //define the classList property, if not defined or if it is read-only
    if (!('classList' in this) || isPropertyReadOnly(this, 'classList', ['class1'])) {
        defineInterfaceProperty(this, 'classList', getClassList, setClassList);
    }
}

//checks if a property name is Special
const isSpecialPropertyName = (name) => {
    switch (name) {
        case 'constructor':
        case 'className': 
            return true;
    }
    return false;
}

/**
    Base constructor for objects.
    
    <h3>Properties</h3>
    
    The following properties are added to an object:
    
        - className: string with class identifiers separated by space.
            Defined if the object does not have a className property.
            
        - classList: array of class names.
            Defined of the object does not have classList property
            or if the classList property is read-only.
            
        - constructor:
            A function which is the aggregate of all constructor functions 
            declared in the given property objects.
            A constructor function is a javascript function with signature <code>() : void</code>,
            which is used to initialize an object.
            
    <h3>Example</h3>
    
    @example
        function myObjectConstructor() {
            this.foo = 'foo';
            this.bar = 'bar';
        }
        
        const MyObject = (...properties) => {
            return Object({}, {
                constructor: myObjectConstructor,
                className: 'Myobject',
                foo: 'foo1',
                bar: 'bar1'
            },
            ...properties);
        }
    
    @param object the target object.
    
    @param properties properties objects.
    
        Each properties object shall contain key/value pairs for the object's properties.
        
        Special properties for a properties object:
        
            - constructor: 
                It is used to construct the object before its properties are set,
                and is also used to create an aggregate function which calls all individual constructor functions in order.
                
            - className:
                It is used to create an aggregate class name for the object.
    
    @return the given object.
 */
export const Object = (object, ...properties) => {
    //init the object
    object.constructor = objectConstructor;
    
    //create the aggregate constructor function;
    //also create the aggregate class name
    let className = 'Object';
    for(const propertiesObject of properties) {
        
        //handle constructor
        const extraConstructor = propertiesObject.constructor;
        if (extraConstructor) {
            const existingConstructor = object.constructor;
            object.constructor = function () {
                existingConstructor.apply(this);
                extraConstructor.apply(this);
            };
        }
        
        //handle classname
        const extraClassName = propertiesObject.className;
        if (extraClassName) {
            className = className + ' ' + extraClassName;
        }
    }
    
    //construct the object
    object.constructor();
    
    //set the classname property
    object.className = className;
    
    //set other properties
    for(const propertiesObject of properties) {
        for(const propertyName in propertiesObject) {
            if (!isSpecialPropertyName(propertyName)) {
                object[propertyName] = propertiesObject[propertyName];
            }
        }
    }
    
    return object;
}
