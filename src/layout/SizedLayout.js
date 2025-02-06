import { defineInterfaceProperty } from '../core/properties.js';
import { Layout } from './Layout.js';

//get size
const getSize = (layout) => layout.width;

//set size (set both width and height from the same value)
const setSize = (layout, value) => {
    layout.width = value;
    layout.height = value;
}

//constructor
function sizedLayoutConstructor() {
    this.width = 0;
    this.height = 0;
    defineInterfaceProperty(this, 'size', getSize, setSize);
    
    //set the apply function
    this.apply = function(element) {
        element.style.width = this.width;
        element.style.height = this.height;
    }
}

/**
    Sized layout constructor.
    A spacing layout takes a specific width and height (or size, to change both properties at once).
    @param properties properties objects.
    @return layout object.
 */
export const SizedLayout = (...properties) => {
    return Layout({ constructor: sizedLayoutConstructor, className: 'SizedLayout' }, ...properties);
}
