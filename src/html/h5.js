import { Element } from './Element.js';

/**
    Creates a h5 element (html 'h5' tag).
    @param properties property object list.
    @return h5 element.
 */
export const h5 = (...properties) => {
    return Element(document.createElement('h5'), { className: 'h5' }, ...properties);
}
