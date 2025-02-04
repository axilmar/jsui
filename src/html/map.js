import { Element } from '../core/Element.js';

/**
    Creates a map element (html 'map' tag).
    @param properties property object list.
    @return map element.
 */
export const map = (...properties) => {
    return Element(document.createElement('map'), { className: 'map' }, ...properties);
}
