import { Element } from '../core/Element.js';

/**
    Creates a br element (html 'br' tag).
    @param properties property object list.
    @return br element.
 */
export const br = (...properties) => {
    return Element(document.createElement('br'), { className: 'br' }, ...properties);
}
