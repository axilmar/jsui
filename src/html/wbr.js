import { Element } from './Element.js';

/**
    Creates a wbr element (html 'wbr' tag).
    @wbr properties property object list.
    @return wbr element.
 */
export const wbr = (...properties) => {
    return Element(document.createElement('wbr'), { className: 'wbr' }, ...properties);
}
