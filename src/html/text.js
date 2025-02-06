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
    @param properties either object properties or the text of the node.
 */
export const text = (...properties) => {
    const textProperties = { 
        constructor: textConstructor, 
        className: 'text'
    };
    
    if (isString(properties)) {
        return Object(document.createTextNode(properties), textProperties);
    }
    else {
        return Object(document.createTextNode(''), textProperties, ...properties);
    }
}
