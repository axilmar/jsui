import { defineValueProperty } from '../core/properties.js';
import { Layout } from './Layout.js';

//constructor
function combinedLayoutConstructor() {
    //define the layouts property
    defineValueProperty(this, 'layouts', []);
    
    //set the apply function
    this.apply = function(element) {
        for(const layout of this._layouts) {
            layout.apply(element);
        }
    }
}

/**
    combined layout constructor.
    Makes an element to have all the properties of the combined layouts and all the apply algorithms
    of the combined layouts.
    It has a property 'layouts' which is the array of layouts that are combined.
    For more information about flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox
    @param properties properties objects.
    @return layout object.
 */
export const CombinedLayout = (...properties) => {
    return Layout({ constructor: combinedLayoutConstructor, className: 'CombinedLayout' }, ...properties);
}

/**
    Function that creates a CombinedLayout, out of the given layouts.
    @param layouts the given layouts.
    @return a combined layout object.
 */
export const combineLayouts = (...layouts) => {
    return CombinedLayout({ layouts });
}
