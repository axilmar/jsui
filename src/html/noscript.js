import { Element } from './Element.js';

/**
    Creates a noscript element (html 'noscript' tag).
    @param properties property object list.
    @return noscript element.
 */
export const noscript = (...properties) => {
    return Element(document.createElement('noscript'), { className: 'noscript' }, ...properties);
}
