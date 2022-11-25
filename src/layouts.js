import { applyProperties } from "./util.js";
import { span } from "./html.js";


export function hbox(properties, ...children) {
    //create the object
    let resultElement = span(null, ...children);
    
    //set the default properties
    resultElement.style.width = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "row";
    
    //set the css
    resultElement.className = "jsui-hbox";
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;
}


export function vbox(properties, ...children) {
    //create the object
    let resultElement = span(null, ...children);
    
    //set the default properties
    resultElement.style.height = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "column";
    
    //set the css
    resultElement.className = "jsui-vbox";
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;
}


export function spacer(properties, ...children) {
    //create the object
    let resultElement = span(null, ...children);
    
    //set the default properties
    resultElement.style.width = "100%";
    resultElement.style.height = "100%";
    resultElement.style.flexGrow = "1";
    
    //set the css
    resultElement.className = "jsui-spacer";
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;
}
