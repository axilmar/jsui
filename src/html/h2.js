import { Element } from './Element.js';

/**
    Creates a h2 element (html 'h2' tag).
    @param properties property object list.
    @return h2 element.
 */
export const h2 = (...properties) => {
    return Element(document.createElement('h2'), { className: 'h2' }, ...properties);
}
