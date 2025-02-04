import { Element } from '../core/Element.js';

/**
    Creates a progress element (html 'progress' tag).
    @param properties property object list.
    @return progress element.
 */
export const progress = (...properties) => {
    return Element(document.createElement('progress'), { className: 'progress' }, ...properties);
}
