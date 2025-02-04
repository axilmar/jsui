import { State } from './src/core/State.js';
import { Element } from './src/core/Element.js';
import { anchor } from './src/html/anchor.js';

function testAnchorConstructor() {
    console.log("testAnchorConstructor: this:", this);
}

const testAnchor = anchor({ constructor: testAnchorConstructor, parent: document.body, href:"http://www.wikipedia.org", text: "Wikipedia" });

const theme1 = {
    decorateElement(element, treeState) {
        element.style.backgroundColor = 'red';
    }
}

document.body.theme = theme1;
