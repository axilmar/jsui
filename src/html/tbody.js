import { Element } from './Element.js';

/**
    Creates a tbody element (html 'tbody' tag).
    @param properties property object list.
    @return tbody element.
 */
export const tbody = (...properties) => {
    return Element(document.createElement('tbody'), { className: 'tbody' }, ...properties);
}
