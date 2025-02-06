import { Element } from './Element.js';

/**
    Creates a form element (html 'form' tag).
    @param properties property object list.
    @return form element.
 */
export const form = (...properties) => {
    return Element(document.createElement('form'), { className: 'form' }, ...properties);
}
