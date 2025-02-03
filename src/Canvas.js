import { Element } from './Element.js';

/**
    Creates a canvas element (html 'canvas' tag).
    @param properties property object list.
    @return canvas element.
 */
export const Canvas = (...properties) => {
    return Element(document.createElement('canvas'), { className: 'Canvas' }, ...properties);
}
