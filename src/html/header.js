import { Element } from './Element.js';

/**
    Creates a header element (html 'header' tag).
    @param properties property object list.
    @return header element.
 */
export const header = (...properties) => {
    return Element(document.createElement('header'), { className: 'header' }, ...properties);
}
