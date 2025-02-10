import { anchor, div, span, text } from './src/html.js';
import { HorizontalLayout, VerticalLayout, FlexibleLayout, combineLayouts, FixedLayout, GridLayout, HorizontalBox, VerticalBox } from './src/layout.js';

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
            layout: FixedLayout({width: '16px', height: '8px'}),
            style: { backgroundColor: 'pink' }
        }),
        div({
            layout: VerticalLayout(),
            children: [div({ children: ' *click it* '}), div({children:' *some text* '})]
        }),
        text(' the quick brown fox')
    ]
});

/*
const gl1 = GridLayout({columns: 3});
console.log(gl1.columns);

const gl2 = GridLayout({columns: 'repeat(3, 1fr)'});
console.log(gl2.columns);

const gl3 = GridLayout({columns: '[col1] 30px [col2] 40px 50px'});
console.log(gl3.columns);

const gl4 = GridLayout({columns: [{name: 'col1', value: '10px'}, '20px', {name: 'col3', value: '30px'}]});
console.log(gl4);
console.log(gl4.columns);
*/

div({
    parent: document.body,
    style: { backgroundColor: 'orange' },
    layout: GridLayout({columns: 3}),
    children: [
        HorizontalBox({children: [span({children:'cell 1-A'}), span({children:'cell 1-B'})]}),
        div({children: 'cell 2'}),
        div({children: 'cell 3'}),
        div({children: 'cell 4'}),
        div({children: 'cell 5'}),
        div({children: 'cell 6'}),
        div({children: 'cell 7'}),
        VerticalBox({children: [span({children:'cell 8-A   '}), span({children:'   cell 8-B'})]}),
    ]
});
