import { Element } from '../core/Element.js';

/**
    Creates a thead element (html 'thead' tag).
    @param properties property object list.
    @return thead element.
 */
export const thead = (...properties) => {
    return Element(document.createElement('thead'), { className: 'thead' }, ...properties);
}
