import { Element } from './Element.js';

/**
    Creates a dd element (html 'dd' tag).
    @param properties property object list.
    @return dd element.
 */
export const dd = (...properties) => {
    return Element(document.createElement('dd'), { className: 'dd' }, ...properties);
}
