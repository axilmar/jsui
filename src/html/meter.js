import { Element } from '../core/Element.js';

/**
    Creates a meter element (html 'meter' tag).
    @param properties property object list.
    @return meter element.
 */
export const meter = (...properties) => {
    return Element(document.createElement('meter'), { className: 'meter' }, ...properties);
}
