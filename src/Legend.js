import { Element } from './Element.js';

/**
    Creates a legend element (html 'legend' tag).
    @param properties property object list.
    @return legend element.
 */
export const Legend = (...properties) => {
    return Element(document.createElement('legend'), { className: 'Legend' }, ...properties);
}
