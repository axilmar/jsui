import { Object } from '../core/Object.js';
import { defineInterfaceProperty } from '../core/properties.js';
import { isString } from '../util/typeUtil.js';

//get parent
const getParent = (node) => node.parentElement;

//set parent
const setParent = (node, parent) => parent.append(node);

//constructor
function textConstructor() {
    defineInterfaceProperty(this, 'parent', getParent, setParent);
}

/**
    Creates a text node.
    
    A text node is not an element node, so an object that is created with 
    this function does not have Element functionalities.
    
    @param properties either object properties or the text of the node.
 */
export const text = (...properties) => {
    const textProperties = { 
        constructor: textConstructor, 
        className: 'text'
    };
    
    const isPropertiesAString = isString(...properties);
    
    const node = isPropertiesAString ? document.createTextNode(...properties) : document.createTextNode('');
    node.isJSUIObject = true;
    
    return isPropertiesAString ? Object(node, textProperties) : Object(node, textProperties, ...properties);
}
