import { Element } from './Element.js';

/**
    Creates a datalist element (html 'datalist' tag).
    @param properties property object list.
    @return datalist element.
 */
export const DataList = (...properties) => {
    return Element(document.createElement('datalist'), { className: 'datalist' }, ...properties);
}
