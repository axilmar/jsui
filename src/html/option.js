import { Element } from './Element.js';

/**
    Creates an option element (html 'option' tag).
    @param properties property object list.
    @return option element.
 */
export const option = (...properties) => {
    return Element(document.createElement('option'), { className: 'option' }, ...properties);
}
