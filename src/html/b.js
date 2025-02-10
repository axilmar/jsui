import { Element } from './Element.js';

/**
    Creates a b element (html 'b' tag).
    @param properties property object list.
    @return b element.
 */
export const b = (...properties) => {
    return Element(document.createElement('b'), { className: 'b' }, ...properties);
}
