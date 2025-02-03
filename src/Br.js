import { Element } from './Element.js';

/**
    Creates a br element (html 'br' tag).
    @param properties property object list.
    @return br element.
 */
export const Br = (...properties) => {
    return Element(document.createElement('br'), { className: 'Br' }, ...properties);
}
