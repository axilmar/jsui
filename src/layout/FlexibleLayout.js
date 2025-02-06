import { Layout } from './Layout.js';

//constructor
function flexibleLayoutConstructor() {
    this.flexGrow = 1;
    
    //set the apply function
    this.apply = function(element) {
        for(const propertyName in this) {
            if (propertyName !== 'apply') {
                element.style[propertyName] = this[propertyName];
            }
        }
    }
}

/**
    Flexible layout constructor.
    Makes an element to have flexGrow value, in order to cover the remaining area of a container. By default, it is 1.
    For more information about flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox
    @param properties properties objects.
    @return layout object.
 */
export const FlexibleLayout = (...properties) => {
    return Layout({ constructor: flexibleLayoutConstructor, className: 'FlexibleLayout' }, ...properties);
}
