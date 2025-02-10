import { Element } from './Element.js';

/**
    Creates an em element (html 'em' tag).
    @param properties property object list.
    @return em element.
 */
export const em = (...properties) => {
    return Element(document.createElement('em'), { className: 'em' }, ...properties);
}
