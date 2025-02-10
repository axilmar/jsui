import { Element } from './Element.js';

/**
    Creates a u element (html 'u' tag).
    @u properties property object list.
    @return u element.
 */
export const u = (...properties) => {
    return Element(document.createElement('u'), { className: 'u' }, ...properties);
}
