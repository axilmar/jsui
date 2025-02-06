import { Element } from './Element.js';

/**
    Creates an audio element (html 'audio' tag).
    @param properties property object list.
    @return audio element.
 */
export const audio = (...properties) => {
    return Element(document.createElement('audio'), { className: 'audio' }, ...properties);
}
