import { div } from '../html/div.js';
import { VerticalLayout } from './VerticalLayout.js';

/**
    A div with a vertical layout.
    @param properties properties objects.
    @return a vertical box.
 */
export const VerticalBox = (...properties) => {
    return div({ className: 'VerticalBox', layout: VerticalLayout() }, ...properties);
}
