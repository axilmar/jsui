import { Element } from './Element.js';

/**
    Creates an hr element (html 'hr' tag).
    @param properties property object list.
    @return hr element.
 */
export const Hr = (...properties) => {
    return Element(document.createElement('hr'), { className: 'Hr' }, ...properties);
}
