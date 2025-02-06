import { Element } from './Element.js';

/**
    Creates an embed element (html 'embed' tag).
    @param properties property object list.
    @return embed element.
 */
export const embed = (...properties) => {
    return Element(document.createElement('embed'), { className: 'embed' }, ...properties);
}
