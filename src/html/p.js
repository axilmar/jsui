import { Element } from '../core/Element.js';

/**
    Creates a p element (html 'p' tag).
    @param properties property object list.
    @return p element.
 */
export const p = (...properties) => {
    return Element(document.createElement('p'), { className: 'p' }, ...properties);
}
