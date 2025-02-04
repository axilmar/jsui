import { Element } from '../core/Element.js';

/**
    Creates a canvas element (html 'canvas' tag).
    @param properties property object list.
    @return canvas element.
 */
export const canvas = (...properties) => {
    return Element(document.createElement('canvas'), { className: 'canvas' }, ...properties);
}
