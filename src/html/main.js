import { Element } from './Element.js';

/**
    Creates a main element (html 'main' tag).
    @param properties property object list.
    @return main element.
 */
export const main = (...properties) => {
    return Element(document.createElement('main'), { className: 'main' }, ...properties);
}
