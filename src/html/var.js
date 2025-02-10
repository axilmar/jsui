import { Element } from './Element.js';

/**
    Creates a var element (html 'var' tag).
    @var properties property object list.
    @return var element.
 */
export const var_ = (...properties) => {
    return Element(document.createElement('var'), { className: 'var' }, ...properties);
}
