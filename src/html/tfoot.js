import { Element } from './Element.js';

/**
    Creates a tfoot element (html 'tfoot' tag).
    @param properties property object list.
    @return tfoot element.
 */
export const tfoot = (...properties) => {
    return Element(document.createElement('tfoot'), { className: 'tfoot' }, ...properties);
}
