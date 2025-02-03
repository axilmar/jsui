import { Element } from './Element.js';

/**
    Creates an area element (html 'area' tag).
    @param properties property object list.
    @return area element.
 */
export const Area = (...properties) => {
    return Element(document.createElement('area'), { className: 'Area' }, ...properties);
}
