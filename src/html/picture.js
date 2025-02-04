import { Element } from '../core/Element.js';

/**
    Creates a picture element (html 'picture' tag).
    @param properties property object list.
    @return picture element.
 */
export const picture = (...properties) => {
    return Element(document.createElement('picture'), { className: 'picture' }, ...properties);
}
