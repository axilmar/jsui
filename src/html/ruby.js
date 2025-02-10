import { Element } from './Element.js';

/**
    Creates an ruby element (html 'ruby' tag).
    @ruby properties property object list.
    @return ruby element.
 */
export const ruby = (...properties) => {
    return Element(document.createElement('ruby'), { className: 'ruby' }, ...properties);
}
