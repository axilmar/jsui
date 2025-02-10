import { Element } from './Element.js';

/**
    Creates an rp element (html 'rp' tag).
    @rp properties property object list.
    @return rp element.
 */
export const rp = (...properties) => {
    return Element(document.createElement('rp'), { className: 'rp' }, ...properties);
}
