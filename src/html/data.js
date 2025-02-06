import { Element } from './Element.js';

/**
    Creates a data element (html 'data' tag).
    @param properties property object list.
    @return data element.
 */
export const data = (...properties) => {
    return Element(document.createElement('data'), { className: 'data' }, ...properties);
}
