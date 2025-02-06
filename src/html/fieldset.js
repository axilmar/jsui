import { Element } from './Element.js';

/**
    Creates a fieldset element (html 'fieldset' tag).
    @param properties property object list.
    @return fieldset element.
 */
export const Fieldset = (...properties) => {
    return Element(document.createElement('fieldset'), { className: 'Fieldset' }, ...properties);
}
