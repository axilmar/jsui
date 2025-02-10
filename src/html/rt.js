import { Element } from './Element.js';

/**
    Creates an rt element (html 'rt' tag).
    @rt properties property object list.
    @return rt element.
 */
export const rt = (...properties) => {
    return Element(document.createElement('rt'), { className: 'rt' }, ...properties);
}
