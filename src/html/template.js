import { Element } from './Element.js';

/**
    Creates a template element (html 'template' tag).
    @template properties property object list.
    @return template element.
 */
export const template = (...properties) => {
    return Element(document.createElement('template'), { className: 'template' }, ...properties);
}
