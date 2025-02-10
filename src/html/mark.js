import { Element } from './Element.js';

/**
    Creates a mark element (html 'mark' tag).
    @param properties property object list.
    @return mark element.
 */
export const mark = (...properties) => {
    return Element(document.createElement('mark'), { className: 'mark' }, ...properties);
}
