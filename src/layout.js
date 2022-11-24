import { applyProperties } from "./util.js";
import { div } from "./html.js";


export function hbox(properties, ...children) {
    //create the object with no properties
    let resultElement = div(null, ...children);
    
    //set the default properties
    resultElement.style.width = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "row";
    
    //set the properties from css after setting the default properties
    resultElement.className = "jsui-hbox";
    
    //set the external properties after setting the default properties and the properties from css 
    applyProperties(resultElement, properties);
    
    return resultElement;
}


export function vbox(properties, ...children) {
    //create the object with no properties
    let resultElement = div(null, ...children);
    
    //set the default properties
    resultElement.style.height = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "column";
    
    //set the properties from css after setting the default properties
    resultElement.className = "jsui-vbox";
    
    //set the external properties after setting the default properties and the properties from css 
    applyProperties(resultElement, properties);
    
    return resultElement;
}
