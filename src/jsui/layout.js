import { applyProperties } from "./util.js";
import { div } from "./html.js";


export function hbox(properties, ...children) {
    let resultElement = div(null, ...children);
    resultElement.style.width = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "row";
    resultElement.className = "jsui-hbox";
    applyProperties(resultElement, properties);
    return resultElement;
}


export function vbox(properties, ...children) {
    let resultElement = div(null, ...children);
    resultElement.style.height = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "column";
    resultElement.className = "jsui-vbox";
    applyProperties(resultElement, properties);
    return resultElement;
}
