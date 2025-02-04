import { Element } from '../core/Element.js';

/**
    Creates a del element (html 'del' tag).
    @param properties property object list.
    @return del element.
 */
export const del = (...properties) => {
    return Element(document.createElement('del'), { className: 'del' }, ...properties);
}
