import { Element } from './Element.js';

/**
    Creates a nav element (html 'nav' tag).
    @param properties property object list.
    @return nav element.
 */
export const nav = (...properties) => {
    return Element(document.createElement('nav'), { className: 'nav' }, ...properties);
}
