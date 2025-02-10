import { Element } from './Element.js';

/**
    Creates an hgroup element (html 'hgroup' tag).
    @param properties property object list.
    @return hgroup element.
 */
export const hgroup = (...properties) => {
    return Element(document.createElement('hgroup'), { className: 'hgroup' }, ...properties);
}
