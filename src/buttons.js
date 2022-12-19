import { applyProperties, addChildren, classListContains } from "./util.js";
import { button, div } from "./html.js";


function fixCommonButtonIconPadding(element, ...children) {
    if (children !== null && children.length > 0) {
        if (classListContains(children[0], "jsui-icon")) {
            element.className += " jsui-common-button-icon-left";
        }
        if (classListContains(children[children.length - 1], "jsui-icon")) {
            element.className += " jsui-common-button-icon-right";
        }
    }
}


export function filledButton(properties, ...children) {
    let resultElement = button({classes: "jsui-button jsui-common-button-dimensions jsui-common-button-corners jsui-filled-button"});
    resultElement.stateLayer = div({parent: resultElement, classes: "jsui-button-layer jsui-button-layer-state"});
    resultElement.contentLayer = div({parent: resultElement, classes: "jsui-button-layer jsui-button-layer-content jsui-common-button-layer-content jsui-button-text"}, ...children);
    fixCommonButtonIconPadding(resultElement.contentLayer, ...children);
    applyProperties(resultElement, properties);
    return resultElement;
}
