import { anchor, div, span, text } from './src/html.js';
import { HorizontalLayout, VerticalLayout, FlexibleLayout, combineLayouts, SizedLayout } from './src/layout.js';

const theme1 = {
    decorateElement(element, treeState) {
        if (element === document.body) {
            element.style.backgroundColor = 'lightcyan';
        }
    }
}

document.html.theme = theme1;

div({
    parent: document.body,
    style: { backgroundColor: 'lightgreen' },
    layout: HorizontalLayout()/*VerticalLayout({ height: '100%' })*/,
    children: [
        div({ children: 'here is a link to: ' }),
        anchor({ href:"http://www.wikipedia.org", text: "Wikipedia" }),
        div({ 
            style: { backgroundColor: 'yellow' },
            layout: VerticalLayout({ flexGrow: 1 }), 
            children: [
                div({children: [ 'text1' ]}),
                div({children: [ 'text2' ]})
            ]
        }),
        div({
            layout: SizedLayout({width: '16px', height: '8px'}),
            style: { backgroundColor: 'pink' }
        }),
        div({
            layout: VerticalLayout(),
            children: [div({ children: ' *click it* '}), div({children:' *some text* '})]
        }),
        text(' the quick brown fox')
    ]
});
