import { Element } from './Element.js';

/**
    Creates a dl element (html 'dl' tag).
    @param properties property object list.
    @return dl element.
 */
export const Dl = (...properties) => {
    return Element(document.createElement('dl'), { className: 'Dl' }, ...properties);
}
