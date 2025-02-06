import { Element } from './Element.js';

/**
    Creates a track element (html 'track' tag).
    @param properties property object list.
    @return track element.
 */
export const track = (...properties) => {
    return Element(document.createElement('track'), { className: 'track' }, ...properties);
}
