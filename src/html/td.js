import { Element } from '../core/Element.js';

/**
    Creates a td element (html 'td' tag).
    @param properties property object list.
    @return td element.
 */
export const td = (...properties) => {
    return Element(document.createElement('td'), { className: 'td' }, ...properties);
}
