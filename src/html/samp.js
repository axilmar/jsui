import { Element } from './Element.js';

/**
    Creates a samp element (html 'samp' tag).
    @samp properties property object list.
    @return samp element.
 */
export const samp = (...properties) => {
    return Element(document.createElement('samp'), { className: 'samp' }, ...properties);
}
