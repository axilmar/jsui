import { Element } from '../core/Element.js';

/**
    Creates a time element (html 'time' tag).
    @param properties property object list.
    @return time element.
 */
export const time = (...properties) => {
    return Element(document.createElement('time'), { className: 'time' }, ...properties);
}
