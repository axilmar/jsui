import { Element } from './Element.js';

/**
    Creates a col element (html 'col' tag).
    @param properties property object list.
    @return col element.
 */
export const col = (...properties) => {
    return Element(document.createElement('col'), { className: 'col' }, ...properties);
}
