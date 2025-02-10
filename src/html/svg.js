import { Element } from './Element.js';

/**
    Creates an svg element (html 'svg' tag).
    @svg properties property object list.
    @return svg element.
 */
export const svg = (...properties) => {
    return Element(document.createElement('svg'), { className: 'svg' }, ...properties);
}
