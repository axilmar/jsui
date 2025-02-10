import { Element } from './Element.js';

/**
    Creates a summary element (html 'summary' tag).
    @summary properties property object list.
    @return summary element.
 */
export const summary = (...properties) => {
    return Element(document.createElement('summary'), { className: 'summary' }, ...properties);
}
