import { Element } from './Element.js';

/**
    Creates a fieldset element (html 'fieldset' tag).
    @param properties property object list.
    @return fieldset element.
 */
export const FieldSet = (...properties) => {
    return Element(document.createElement('fieldset'), { className: 'FieldSet' }, ...properties);
}
