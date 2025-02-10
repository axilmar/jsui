import { Element } from './Element.js';

/**
    Creates an aside element (html 'aside' tag).
    @param properties property object list.
    @return aside element.
 */
export const aside = (...properties) => {
    return Element(document.createElement('aside'), { className: 'aside' }, ...properties);
}
