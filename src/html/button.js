import { Element } from '../core/Element.js';

/**
    Creates a button element (html 'button' tag).
    @param properties property object list.
    @return button element.
 */
export const button = (...properties) => {
    return Element(document.createElement('button'), { className: 'button' }, ...properties);
}
