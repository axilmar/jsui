import { Element } from './Element.js';

/**
    Creates a i element (html 'i' tag).
    @param properties property object list.
    @return i element.
 */
export const i = (...properties) => {
    return Element(document.createElement('i'), { className: 'i' }, ...properties);
}
