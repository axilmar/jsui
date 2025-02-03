import { Element } from './Element.js';

/**
    Creates an audio element (html 'audio' tag).
    @param properties property object list.
    @return audio element.
 */
export const Audio = (...properties) => {
    return Element(document.createElement('audio'), { className: 'Audio' }, ...properties);
}
