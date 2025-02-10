import { Element } from './Element.js';

/**
    Creates a section element (html 'section' tag).
    @section properties property object list.
    @return section element.
 */
export const section = (...properties) => {
    return Element(document.createElement('section'), { className: 'section' }, ...properties);
}
