import { Element } from '../core/Element.js';

/**
    Creates a colgroup element (html 'colgroup' tag).
    @param properties property object list.
    @return colgroup element.
 */
export const colgroup = (...properties) => {
    return Element(document.createElement('colgroup'), { className: 'colgroup' }, ...properties);
}
