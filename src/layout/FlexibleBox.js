import { div } from '../html/div.js';
import { FlexibleLayout } from './FlexibleLayout.js';

/**
    A div with a flexible layout.
    @param properties properties objects; 
        a property 'layoutProperties' in the first properties object is used for assigning properties to the layout.
    @return a flexible box.
 */
export const FlexibleBox = (...properties) => {
    return div({ className: 'FlexibleBox', layout: FlexibleLayout(properties[0]?.layoutProperties) }, ...properties);
}
