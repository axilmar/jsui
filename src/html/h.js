import { Element } from './Element.js';

/**
    Creates an h1 element (html 'h1' tag).
    @param properties property object list.
    @return h1 element.
 */
export const h1 = (...properties) => {
    return Element(document.createElement('h1'), { className: 'h1' }, ...properties);
}

/**
    Creates an h2 element (html 'h2' tag).
    @param properties property object list.
    @return h2 element.
 */
export const h2 = (...properties) => {
    return Element(document.createElement('h2'), { className: 'h2' }, ...properties);
}

/**
    Creates an h3 element (html 'h3' tag).
    @param properties property object list.
    @return h3 element.
 */
export const h3 = (...properties) => {
    return Element(document.createElement('h3'), { className: 'h3' }, ...properties);
}

/**
    Creates an h4 element (html 'h4' tag).
    @param properties property object list.
    @return h4 element.
 */
export const h4 = (...properties) => {
    return Element(document.createElement('h4'), { className: 'h4' }, ...properties);
}

/**
    Creates an h5 element (html 'h5' tag).
    @param properties property object list.
    @return h5 element.
 */
export const h5 = (...properties) => {
    return Element(document.createElement('h5'), { className: 'h5' }, ...properties);
}

/**
    Creates an h6 element (html 'h6' tag).
    @param properties property object list.
    @return h6 element.
 */
export const h6 = (...properties) => {
    return Element(document.createElement('h6'), { className: 'h6' }, ...properties);
}
