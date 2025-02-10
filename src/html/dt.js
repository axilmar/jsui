import { Element } from './Element.js';

/**
    Creates a dt element (html 'dt' tag).
    @param properties property object list.
    @return dt element.
 */
export const dt = (...properties) => {
    return Element(document.createElement('dt'), { className: 'dt' }, ...properties);
}
