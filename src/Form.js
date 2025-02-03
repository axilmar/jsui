import { Element } from './Element.js';

/**
    Creates a form element (html 'form' tag).
    @param properties property object list.
    @return form element.
 */
export const Form = (...properties) => {
    return Element(document.createElement('form'), { className: 'Form' }, ...properties);
}
