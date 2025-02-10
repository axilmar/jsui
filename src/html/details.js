import { Element } from './Element.js';

/**
    Creates a details element (html 'details' tag).
    @param properties property object list.
    @return details element.
 */
export const details = (...properties) => {
    return Element(document.createElement('details'), { className: 'details' }, ...properties);
}
