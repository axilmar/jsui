import { Element } from './Element.js';

/**
    Creates a bdo element (html 'bdo' tag).
    @param properties property object list.
    @return bdo element.
 */
export const bdo = (...properties) => {
    return Element(document.createElement('bdo'), { className: 'bdo' }, ...properties);
}
