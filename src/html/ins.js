import { Element } from '../core/Element.js';

/**
    Creates an ins element (html 'ins' tag).
    @param properties property object list.
    @return ins element.
 */
export const ins = (...properties) => {
    return Element(document.createElement('ins'), { className: 'ins' }, ...properties);
}
