import { Element } from './Element.js';

/**
    Creates a label element (html 'label' tag).
    @param properties property object list.
    @return label element.
 */
export const label = (...properties) => {
    return Element(document.createElement('label'), { className: 'label' }, ...properties);
}
