import { Element } from '../core/Element.js';

/**
    Creates a dl element (html 'dl' tag).
    @param properties property object list.
    @return dl element.
 */
export const dl = (...properties) => {
    return Element(document.createElement('dl'), { className: 'dl' }, ...properties);
}
