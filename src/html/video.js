import { Element } from '../core/Element.js';

/**
    Creates a video element (html 'video' tag).
    @param properties property object list.
    @return video element.
 */
export const video = (...properties) => {
    return Element(document.createElement('video'), { className: 'video' }, ...properties);
}
