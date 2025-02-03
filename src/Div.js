import { Element } from './Element.js';

/**
    Creates a div element (html 'div' tag).
    @param properties property object list.
    @return div element.
 */
export const Div = (...properties) => {
    return Element(document.createElement('div'), { className: 'Div' }, ...properties);
}
