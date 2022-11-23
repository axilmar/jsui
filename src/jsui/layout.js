import { applyProperties, addChildren } from "./util.js";
import { div } from "./html.js";


export function hbox(properties, ...children) {
    let resultElement = div(properties, ...children);
    resultElement.className = "jsui-hbox";
    resultElement.style.width = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "row";
    return resultElement;
}


export function vbox(properties, ...children) {
    let resultElement = div(properties, ...children);
    resultElement.className = "jsui-vbox";
    resultElement.style.height = "100%";
    resultElement.style.display = "flex";
    resultElement.style.flexDirection = "column";
    return resultElement;
}
