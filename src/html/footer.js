import { Element } from './Element.js';

/**
    Creates a footer element (html 'footer' tag).
    @param properties property object list.
    @return footer element.
 */
export const footer = (...properties) => {
    return Element(document.createElement('footer'), { className: 'footer' }, ...properties);
}
