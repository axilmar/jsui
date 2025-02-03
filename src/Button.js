import { Element } from './Element.js';

/**
    Creates a button element (html 'button' tag).
    @param properties property object list.
    @return button element.
 */
export const Button = (...properties) => {
    return Element(document.createElement('button'), { className: 'Button' }, ...properties);
}
