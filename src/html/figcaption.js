import { Element } from './Element.js';

/**
    Creates a figcaption element (html 'figcaption' tag).
    @param properties property object list.
    @return figcaption element.
 */
export const figcaption = (...properties) => {
    return Element(document.createElement('figcaption'), { className: 'figcaption' }, ...properties);
}
