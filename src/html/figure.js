import { Element } from './Element.js';

/**
    Creates a figure element (html 'figure' tag).
    @param properties property object list.
    @return figure element.
 */
export const figure = (...properties) => {
    return Element(document.createElement('figure'), { className: 'figure' }, ...properties);
}
