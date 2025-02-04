import { Element } from '../core/Element.js';

/**
    Creates an iframe element (html 'hr' tag).
    @param properties property object list.
    @return hr element.
 */
export const iframe = (...properties) => {
    return Element(document.createElement('iframe'), { className: 'iframe' }, ...properties);
}
