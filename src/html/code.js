import { Element } from './Element.js';

/**
    Creates a code element (html 'code' tag).
    @param properties property object list.
    @return code element.
 */
export const code = (...properties) => {
    return Element(document.createElement('code'), { className: 'code' }, ...properties);
}
