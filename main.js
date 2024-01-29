import { State, Element } from './src/Element.js';

const InputForm = (name, left, top, text = '') => {
    return ( 
        Element('div', {
            properties: {
                name: name
            },
            style: {
                //position: 'relative',
                left: left,
                top: top,
                width: '100px',
                height: '50px',
                padding: '10px'
            },
            styles: {
                [State.ENABLED]: {
                    backgroundColor: 'lightgray'
                },
                [State.ENABLED + State.ACTIVE]: {
                    backgroundColor: 'cyan'
                }
            }}, 

            //input
            Element('input', {
                properties: {
                    name: 'Input',
                    value: text
                },
                style: {
                    width: '50px',
                    height: '30px',
                    padding: '0'
                },
                styles:{
                    [State.ENABLED]: {
                        backgroundColor: 'white'
                    },
                    [State.ENABLED + State.ACTIVE]: {
                        backgroundColor: 'white'
                    },
                    [State.ENABLED + State.FOCUSED]: {
                        backgroundColor: 'yellow'
                    }
                }}
            ),

            //ok button
            Element('button', {
                properties: {
                    name: 'okButton'
                },
                style: {
                    width: '30px',
                    height: '30px'
                },
                styles: {
                    [[State.ENABLED, 
                      State.ENABLED + State.ACTIVE,
                      State.ENABLED + State.FOCUSED, 
                      State.ENABLED + State.ACTIVE + State.FOCUSED]]: {
                        backgroundColor: 'lightgray'
                    },
                    [[State.ENABLED + State.HIGHLIGHTED, 
                      State.ENABLED + State.ACTIVE + State.HIGHLIGHTED,
                      State.ENABLED + State.FOCUSED + State.HIGHLIGHTED, 
                      State.ENABLED + State.ACTIVE + State.FOCUSED + State.HIGHLIGHTED]]: {
                        backgroundColor: 'white'
                    }
                },
                events: {
                    'click': () => console.log('OK pressed for InputForm ' + name)
                }},
                "Ok"
            )
        )
    );
}

const inputForm1 = InputForm('inputForm1', '20px', '10px', 'form1');
document.body.append(inputForm1);

const tempDiv = Element('div', { 
    properties: {
        name: 'tempDiv'
    },
    style: {
        position: 'absolute',
        left: '200px',
        top: '150px',
        width: '200px',
        height: '150px',
        padding: '20px',
        backgroundColor: 'purple'
    }});
document.body.append(tempDiv);    

const inputForm2 = InputForm('inputForm2', '20px', '10px', 'form2');
tempDiv.append(inputForm2);

//document.body.style.display = 'flex';
//document.body.style.gap = '12px';