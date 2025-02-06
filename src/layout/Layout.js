import { Object } from '../core/Object.js';

/**
    Layout constructor.
    @param properties properties objects.
    @return layout object.
 */
export const Layout = (...properties) => {
    return Object({}, { className: 'Layout' }, ...properties);
}
