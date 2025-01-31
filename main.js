import { Theme } from './src/Theme.js';
import { State } from './src/State.js';
import { Element } from './src/Element.js';

const testTheme = Theme({ 
    decorateElement: (element, state) => {
        if ((state & State.DISABLED) === State.DISABLED) {
            element.style.backgroundColor = 'lightgrey';
            return;
        }
        element.style.backgroundColor = 'yellow';
        if ((state & State.SELECTED) === State.SELECTED) {
            element.style.backgroundColor = 'lightblue';
        }
        if ((state & State.HIGHLIGHTED) === State.HIGHLIGHTED) {
            element.style.backgroundColor = 'cyan';
        }
        if ((state & State.FOCUSED) === State.FOCUSED) {
            element.style.backgroundColor = 'purple';
        }
        if ((state & State.PRESSED) === State.PRESSED) {
            element.style.backgroundColor = 'blue';
        }
    }
});

const testDiv = Element(document.createElement('div'), {
    parent: document.body,
    theme: testTheme,
    style: {width: "64px", height:"64px"},
    pressable: true,
    highlightable: true,
    focusable: true,
    enabled: true,
    selected: false,
    id: "TestDiv",
    onTreeStateChanged: function (oldTreeState, newTreeState) {
        console.log("State changed on element with id = " + this.id + "; new state = " + newTreeState);
    },
    onclick: function (event) {
        this.focus();
    },
    children: [
        Element(document.createElement('input'), {
            theme: testTheme,            
            style: {width: "48px", height:"32px"},
            id: "TestInput"
        })
    ]
});

