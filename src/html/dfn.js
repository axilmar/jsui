import { Element } from './Element.js';

/**
    Creates a dfn element (html 'dfn' tag).
    @param properties property object list.
    @return dfn element.
 */
export const dfn = (...properties) => {
    return Element(document.createElement('dfn'), { className: 'dfn' }, ...properties);
}
