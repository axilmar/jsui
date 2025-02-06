import { Element } from './Element.js';

/**
    Creates a cite element (html 'cite' tag).
    @param properties property object list.
    @return cite element.
 */
export const cite = (...properties) => {
    return Element(document.createElement('cite'), { className: 'cite' }, ...properties);
}
