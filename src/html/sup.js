import { Element } from './Element.js';

/**
    Creates a sup element (html 'sup' tag).
    @sup properties property object list.
    @return sup element.
 */
export const sup = (...properties) => {
    return Element(document.createElement('sup'), { className: 'sup' }, ...properties);
}
