import { Element } from './Element.js';

/**
    Creates a h4 element (html 'h4' tag).
    @param properties property object list.
    @return h4 element.
 */
export const h4 = (...properties) => {
    return Element(document.createElement('h4'), { className: 'h4' }, ...properties);
}
