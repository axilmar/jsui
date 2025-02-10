import { Element } from './Element.js';

/**
    Creates a sub element (html 'sub' tag).
    @sub properties property object list.
    @return sub element.
 */
export const sub = (...properties) => {
    return Element(document.createElement('sub'), { className: 'sub' }, ...properties);
}
