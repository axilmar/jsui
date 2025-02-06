import { Element } from './Element.js';

/**
    Creates a source element (html 'source' tag).
    @param properties property object list.
    @return source element.
 */
export const source = (...properties) => {
    return Element(document.createElement('source'), { className: 'source' }, ...properties);
}
