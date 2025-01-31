import { State } from './src/State.js';
import { Element } from './src/Element.js';

const testTheme = {
    decorateElement(element, state) {
        element.style.backgroundColor = 'yellow';
        if ((state & State.DISABLED) == State.DISABLED) {
            element.style.backgroundColor = 'lightgrey';
            return;
        }
        if ((state & State.HIGHLIGHTED) == State.HIGHLIGHTED) {
            element.style.backgroundColor = 'cyan';
        }
        if ((state & State.SELECTED) == State.SELECTED) {
            element.style.backgroundColor = 'lightblue';
        }
        if ((state & State.FOCUSED) == State.FOCUSED) {
            element.style.backgroundColor = 'purple';
        }
        if ((state & State.PRESSED) == State.PRESSED) {
            element.style.backgroundColor = 'blue';
        }
    }
}

const testDiv = Element(document.createElement('div'), {
    parent: document.body,
    theme: testTheme,
    style: {width: "64px", height:"64px"},
    //pressable: true,
    highlightable: true,
    focusable: true,
    enabled: true,
    selected: false,
    children: [
        Element(document.createElement('input'), {
            theme: testTheme,            
            style: {width: "48px", height:"32px"},
        })
    ]
});

document.body.appendChild(testDiv);
