import { Element } from './Element.js';

/**
    Creates a kbd element (html 'kbd' tag).
    @param properties property object list.
    @return kbd element.
 */
export const kbd = (...properties) => {
    return Element(document.createElement('kbd'), { className: 'kbd' }, ...properties);
}
