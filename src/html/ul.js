import { Element } from '../core/Element.js';

/**
    Creates a ul element (html 'ul' tag).
    @param properties property object list.
    @return ul element.
 */
export const ul = (...properties) => {
    return Element(document.createElement('ul'), { className: 'ul' }, ...properties);
}
