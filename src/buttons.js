import { applyProperties } from "./util.js";
import { button } from "./html.js";


function isButtonWithIcon(button) {
    return button.childNodes.length == 2 && button.childNodes[0].classList.contains("jsui-icon");
}


export function primaryButton(properties, ...children) {
    let resultElement = button(null, ...children);
    
    //set the css
    resultElement.className = "jsui-primary-button" + (isButtonWithIcon(resultElement) ? " jsui-primary-button-icon-left" : "");
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;
}
