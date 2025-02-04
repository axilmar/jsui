import { Element } from '../core/Element.js';

/**
    Creates a q element (html 'q' tag).
    @param properties property object list.
    @return q element.
 */
export const q = (...properties) => {
    return Element(document.createElement('q'), { className: 'q' }, ...properties);
}
