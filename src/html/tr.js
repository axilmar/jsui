import { Element } from '../core/Element.js';

/**
    Creates a tr element (html 'tr' tag).
    @param properties property object list.
    @return tr element.
 */
export const tr = (...properties) => {
    return Element(document.createElement('tr'), { className: 'tr' }, ...properties);
}
