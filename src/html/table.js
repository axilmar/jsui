import { Element } from '../core/Element.js';

/**
    Creates a table element (html 'table' tag).
    @param properties property object list.
    @return table element.
 */
export const table = (...properties) => {
    return Element(document.createElement('table'), { className: 'table' }, ...properties);
}
