import { Element } from './Element.js';

/**
    Creates an anchor element (html 'a' tag).
    @param properties property object list.
    @return anchor element.
 */
export const Anchor = (...properties) => {
    return Element(document.createElement('a'), { className: 'Anchor' }, ...properties);
}
