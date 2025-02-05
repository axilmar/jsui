import { Element } from './src/core.js';
import { anchor,div, p, span } from './src/html.js';

function testAnchorConstructor() {
    console.log("testAnchorConstructor: this:", this);
}

const theme1 = {
    decorateElement(element, treeState) {
        element.style.backgroundColor = 'lightcyan';
    }
}

document.html.theme = theme1;

div({
    parent: document.body,
    children: [
        p({
            children: [
                'here is a link to: ',
                anchor({ constructor: testAnchorConstructor, href:"http://www.wikipedia.org", text: "Wikipedia" }),
                span({
                    children: ['; click it!']
                })
            ]
        })
    ]
});
