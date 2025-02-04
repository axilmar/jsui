import { Element } from '../core/Element.js';

/**
    Creates a textarea element (html 'textarea' tag).
    @param properties property object list.
    @return textarea element.
 */
export const textarea = (...properties) => {
    return Element(document.createElement('textarea'), { className: 'textarea' }, ...properties);
}
