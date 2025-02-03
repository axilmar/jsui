import { Element } from './Element.js';

/**
    Creates an iframe element (html 'hr' tag).
    @param properties property object list.
    @return hr element.
 */
export const IFrame = (...properties) => {
    return Element(document.createElement('iframe'), { className: 'IFrame' }, ...properties);
}
