import { Element } from '../core/Element.js';

/**
    Creates a span element (html 'span' tag).
    @param properties property object list.
    @return span element.
 */
export const span = (...properties) => {
    return Element(document.createElement('span'), { className: 'span' }, ...properties);
}
