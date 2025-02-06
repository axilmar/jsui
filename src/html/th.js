import { Element } from './Element.js';

/**
    Creates a th element (html 'th' tag).
    @param properties property object list.
    @return th element.
 */
export const th = (...properties) => {
    return Element(document.createElement('th'), { className: 'th' }, ...properties);
}
