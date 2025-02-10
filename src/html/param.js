import { Element } from './Element.js';

/**
    Creates a param element (html 'param' tag).
    @param properties property object list.
    @return param element.
 */
export const param = (...properties) => {
    return Element(document.createElement('param'), { className: 'param' }, ...properties);
}
