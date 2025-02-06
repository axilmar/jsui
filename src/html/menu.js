import { Element } from './Element.js';

/**
    Creates a menu element (html 'menu' tag).
    @param properties property object list.
    @return menu element.
 */
export const menu = (...properties) => {
    return Element(document.createElement('menu'), { className: 'menu' }, ...properties);
}
