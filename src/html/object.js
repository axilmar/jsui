import { Element } from '../core/Element.js';

/**
    Creates an object element (html 'object' tag).
    @param properties property object list.
    @return object element.
 */
export const object = (...properties) => {
    return Element(document.createElement('object'), { className: 'object' }, ...properties);
}
