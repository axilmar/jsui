import { Element } from '../core/Element.js';

/**
    Creates an output element (html 'output' tag).
    @param properties property object list.
    @return output element.
 */
export const output = (...properties) => {
    return Element(document.createElement('output'), { className: 'output' }, ...properties);
}
