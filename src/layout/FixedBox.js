import { div } from '../html/div.js';
import { FixedLayout } from './FixedLayout.js';

/**
    A div with a fixed layout of size 8x8 pixels (mainly provided for spacing).
    @param properties properties objects; 
        a property 'layoutProperties' in the first properties object is used for assigning properties to the layout
    @return a fixed box.
 */
export const FixedBox = (...properties) => {
    return div({ className: 'FixedBox', layout: FixedLayout({ width: '8px', height: '8px' }, properties[0]?.layoutProperties) }, ...properties);
}
