import { Element } from '../core/Element.js';

/**
    Creates a select element (html 'select' tag).
    @param properties property object list.
    @return select element.
 */
export const select = (...properties) => {
    return Element(document.createElement('select'), { className: 'select' }, ...properties);
}
