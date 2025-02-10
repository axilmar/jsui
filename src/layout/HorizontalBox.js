import { div } from '../html/div.js';
import { HorizontalLayout } from './HorizontalLayout.js';

/**
    A div with a horizontal layout with a default hap of 8 pixels.
    @param properties properties objects; 
        a property 'layoutProperties' in the first properties object is used for assigning properties to the layout. 
    @return a horizontal box.
 */
export const HorizontalBox = (...properties) => {
    return div({ className: 'HorizontalBox', layout: HorizontalLayout({ gap: '8px' }, properties[0]?.layoutProperties) }, ...properties);
}
