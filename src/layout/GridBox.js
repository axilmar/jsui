import { div } from '../html/div.js';
import { GridLayout } from './GridLayout.js';

/**
    A div with a grid layout.
        By default, the columns property is set to 1.
    @param properties properties objects; 
        a property 'layoutProperties' in the first properties object is used for assigning properties to the layout;
        a property 'columns' in the first properties object is used for customizing the columns number.
    @return a grid box.
 */
export const GridBox = (...properties) => {
    return div({ className: 'GridBox', layout: GridLayout({ columns: properties[0]?.columns || 1 }, properties[0]?.layoutProperties) }, ...properties);
}
