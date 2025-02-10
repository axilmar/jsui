import { Element } from './Element.js';

/**
    Creates an s element (html 's' tag).
    @s properties property object list.
    @return s element.
 */
export const s = (...properties) => {
    return Element(document.createElement('s'), { className: 's' }, ...properties);
}
