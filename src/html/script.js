import { Element } from './Element.js';

/**
    Creates a script element (html 'script' tag).
    @param properties property object list.
    @return script element.
 */
export const script = (...properties) => {
    return Element(document.createElement('script'), { className: 'script' }, ...properties);
}
