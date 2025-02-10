import { Element } from './Element.js';

/**
    Creates a small element (html 'small' tag).
    @small properties property object list.
    @return small element.
 */
export const small = (...properties) => {
    return Element(document.createElement('small'), { className: 'small' }, ...properties);
}
