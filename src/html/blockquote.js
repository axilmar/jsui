import { Element } from '../core/Element.js';

/**
    Creates a blockquote element (html 'blockquote' tag).
    @param properties property object list.
    @return blockquote element.
 */
export const blockquote = (...properties) => {
    return Element(document.createElement('blockquote'), { className: 'blockquote' }, ...properties);
}
