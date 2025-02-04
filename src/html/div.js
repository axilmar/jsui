import { Element } from '../core/Element.js';

/**
    Creates a div element (html 'div' tag).
    @param properties property object list.
    @return div element.
 */
export const div = (...properties) => {
    return Element(document.createElement('div'), { className: 'div' }, ...properties);
}
