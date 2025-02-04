import { Element } from '../core/Element.js';

/**
    Creates an article element (html 'article' tag).
    @param properties property object list.
    @return article element.
 */
export const article = (...properties) => {
    return Element(document.createElement('article'), { className: 'article' }, ...properties);
}
