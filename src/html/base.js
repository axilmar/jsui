import { Element } from '../core/Element.js';

/**
    Creates a base element (html 'base' tag).
    @param properties property object list.
    @return base element.
 */
export const base = (...properties) => {
    return Element(document.createElement('base'), { className: 'base' }, ...properties);
}
