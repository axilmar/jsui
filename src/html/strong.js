import { Element } from './Element.js';

/**
    Creates a strong element (html 'strong' tag).
    @strong properties property object list.
    @return strong element.
 */
export const strong = (...properties) => {
    return Element(document.createElement('strong'), { className: 'strong' }, ...properties);
}
