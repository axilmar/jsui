import { Element } from './Element.js';

/**
    Creates a h6 element (html 'h6' tag).
    @param properties property object list.
    @return h6 element.
 */
export const h6 = (...properties) => {
    return Element(document.createElement('h6'), { className: 'h6' }, ...properties);
}
