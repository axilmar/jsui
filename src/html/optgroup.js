import { Element } from '../core/Element.js';

/**
    Creates an optgroup element (html 'optgroup' tag).
    @param properties property object list.
    @return optgroup element.
 */
export const optgroup = (...properties) => {
    return Element(document.createElement('optgroup'), { className: 'optgroup' }, ...properties);
}
