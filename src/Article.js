import { Element } from './Element.js';

/**
    Creates an article element (html 'article' tag).
    @param properties property object list.
    @return article element.
 */
export const Article = (...properties) => {
    return Element(document.createElement('article'), { className: 'Article' }, ...properties);
}
