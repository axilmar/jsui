import { div } from '../html/div.js';
import { HorizontalLayout } from './HorizontalLayout.js';

/**
    A div with a horizontal layout.
    @param properties properties objects.
    @return a horizontal box.
 */
export const HorizontalBox = (...properties) => {
    return div({ className: 'HorizontalBox', layout: HorizontalLayout() }, ...properties);
}
