import { applyProperties, classListContains } from "./util.js";
import { button } from "./html.js";


function isButtonWithIcon(button) {
    return button.childNodes.length >= 2 && button.childNodes[0].classList.contains("jsui-icon");
}


export function primaryButton(properties, ...children) {
    let resultElement = button(null, ...children);
    
    //set the css; 
    //if the first child is an icon, apply the appropriate left padding;
    //if the last child is an icon, apply the appropriate right padding.
    
    let className = "jsui-primary-button";
    
    if (resultElement.childNodes.length >= 1) {
        let children = resultElement.childNodes;
        
        if (classListContains(children[0], "jsui-icon")) {
            className += " jsui-primary-button-icon-left";
        }
        
        if (classListContains(children[children.length - 1], "jsui-icon")) {
            className += " jsui-primary-button-icon-right";
        }
    }
    
    resultElement.className = className;
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;
}
