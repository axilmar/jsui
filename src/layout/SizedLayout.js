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
    A spacing layout takes a specific width / height.
    
    <h3>Properties</H3>
    
    The following custom properties are defined:

        - width: width; e.g. '32px', '100%' etc. Any css value for the same css property.
        - height: height; e.g. '32px', '100%' etc. Any css value for the same css property.
        - size: sets both width and height to the same value.
    
    @param properties properties objects.
    @return layout object.
 */
export const SizedLayout = (...properties) => {
    return Layout({ constructor: sizedLayoutConstructor, className: 'SizedLayout' }, ...properties);
}
