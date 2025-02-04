import { Element } from '../core/Element.js';

/**
    Creates an image element (html 'img' tag).
    @param properties property object list.
    @return img element.
 */
export const img = (...properties) => {
    return Element(document.createElement('img'), { className: 'img' }, ...properties);
}
