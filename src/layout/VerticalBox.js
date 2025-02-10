import { div } from '../html/div.js';
import { VerticalLayout } from './VerticalLayout.js';

/**
    A div with a vertical layout.
    @param properties properties objects; 
        a property 'layoutProperties' in the first properties object is used for assigning properties to the layout.
    @return a vertical box.
 */
export const VerticalBox = (...properties) => {
    return div({ className: 'VerticalBox', layout: VerticalLayout({ gap: '8px' }, properties[0]?.layoutProperties) }, ...properties);
}

/**
 * Alternative shorter symbol for VerticalBox.
 */
export const VBox = VerticalBox;
