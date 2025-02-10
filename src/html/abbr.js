import { Element } from './Element.js';

/**
    Creates an abbr element (html 'abbr' tag).
    @param properties property object list.
    @return abbr element.
 */
export const abbr = (...properties) => {
    return Element(document.createElement('abbr'), { className: 'abbr' }, ...properties);
}
