import { Element } from '../core/Element.js';

/**
    Creates an li element (html 'li' tag).
    @param properties property object list.
    @return li element.
 */
export const li = (...properties) => {
    return Element(document.createElement('li'), { className: 'li' }, ...properties);
}
