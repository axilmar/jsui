import { Element } from './Element.js';

/**
    Creates a search element (html 'search' tag).
    @search properties property object list.
    @return search element.
 */
export const search = (...properties) => {
    return Element(document.createElement('search'), { className: 'search' }, ...properties);
}
