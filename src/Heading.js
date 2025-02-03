import { Element } from './Element.js';

/**
    Creates an h1 element (html 'h1' tag).
    @param properties property object list.
    @return h1 element.
 */
export const H1 = (...properties) => {
    return Element(document.createElement('h1'), { className: 'H1' }, ...properties);
}

/**
    Creates an h2 element (html 'h2' tag).
    @param properties property object list.
    @return h2 element.
 */
export const H2 = (...properties) => {
    return Element(document.createElement('h2'), { className: 'H2' }, ...properties);
}

/**
    Creates an h3 element (html 'h3' tag).
    @param properties property object list.
    @return h3 element.
 */
export const H3 = (...properties) => {
    return Element(document.createElement('h3'), { className: 'H3' }, ...properties);
}

/**
    Creates an h4 element (html 'h4' tag).
    @param properties property object list.
    @return h4 element.
 */
export const H4 = (...properties) => {
    return Element(document.createElement('h4'), { className: 'H4' }, ...properties);
}

/**
    Creates an h5 element (html 'h5' tag).
    @param properties property object list.
    @return h5 element.
 */
export const H5 = (...properties) => {
    return Element(document.createElement('h5'), { className: 'H5' }, ...properties);
}

/**
    Creates an h6 element (html 'h6' tag).
    @param properties property object list.
    @return h6 element.
 */
export const H6 = (...properties) => {
    return Element(document.createElement('h6'), { className: 'H6' }, ...properties);
}
