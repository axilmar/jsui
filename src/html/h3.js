import { Element } from './Element.js';

/**
    Creates a h3 element (html 'h3' tag).
    @param properties property object list.
    @return h3 element.
 */
export const h3 = (...properties) => {
    return Element(document.createElement('h3'), { className: 'h3' }, ...properties);
}
