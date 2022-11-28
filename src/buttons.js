import { applyProperties } from "./util.js";
import { button } from "./html.js";


export function primaryButton(properties, ...children) {
    let resultElement = button(null, ...children);
    
    //set the css
    resultElement.className = "jsui-primary-button";
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;
}
