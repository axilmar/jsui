import { Element } from './Element.js';

/**
    Creates an address element (html 'address' tag).
    @param properties property object list.
    @return address element.
 */
export const address = (...properties) => {
    return Element(document.createElement('address'), { className: 'address' }, ...properties);
}
