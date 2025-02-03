import { Element } from './Element.js';

/**
    Creates an image element (html 'img' tag).
    @param properties property object list.
    @return img element.
 */
export const Img = (...properties) => {
    return Element(document.createElement('img'), { className: 'Img' }, ...properties);
}
