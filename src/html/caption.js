import { Element } from '../core/Element.js';

/**
    Creates a caption element (html 'caption' tag).
    @param properties property object list.
    @return caption element.
 */
export const caption = (...properties) => {
    return Element(document.createElement('caption'), { className: 'caption' }, ...properties);
}
