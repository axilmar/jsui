import { Element } from './Element.js';

/**
    Creates a pre element (html 'pre' tag).
    @param properties property object list.
    @return pre element.
 */
export const pre = (...properties) => {
    return Element(document.createElement('pre'), { className: 'pre' }, ...properties);
}
