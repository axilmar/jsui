import { Element } from '../core/Element.js';

/**
    Creates an ol element (html 'ol' tag).
    @param properties property ol list.
    @return ol element.
 */
export const ol = (...properties) => {
    return Element(document.createElement('ol'), { className: 'ol' }, ...properties);
}
