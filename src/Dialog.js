import { Element } from './Element.js';

/**
    Creates a dialog element (html 'dialog' tag).
    @param properties property object list.
    @return dialog element.
 */
export const Dialog = (...properties) => {
    return Element(document.createElement('dialog'), { className: 'Dialog' }, ...properties);
}
