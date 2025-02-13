import { Layout } from './Layout.js';

//constructor
function horizontalLayoutConstructor() {
    this.display = 'flex';
    this.flexDirection = 'row';
    this.alignItems = 'center';
    
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
    Horizontal layout constructor.
    A horizontal layout is an algorithm that makes an element to have a horizontal flex display.
    Flex box properties are applicable.
    For more information about flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox
    @param properties properties objects.
    @return layout object.
 */
export const HorizontalLayout = (...properties) => {
    return Layout({ constructor: horizontalLayoutConstructor, className: 'HorizontalLayout', style: { width:'100%' } }, ...properties);
}

/**
 * Alternative shorter symbol for HorizontalLayout.
 */
export const HLayout = HorizontalLayout;
