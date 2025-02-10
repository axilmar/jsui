import { Element } from './Element.js';

/**
    Creates a h1 element (html 'h1' tag).
    @param properties property object list.
    @return h1 element.
 */
export const h1 = (...properties) => {
    return Element(document.createElement('h1'), { className: 'h1' }, ...properties);
}
