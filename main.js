import { Element } from './src/Element.js';

const div1 = Element('div', {}, "Hello world");
document.body.append(div1);

const div2 = Element('div', {}, Element('img', { properties: { src: '/public/images/logo.png' }}));
document.body.append(div2);
