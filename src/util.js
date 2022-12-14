import "./init.js"


function appendClasses(elementObject, value) {
    if (elementObject.className.length > 0) {
        elementObject.className += " " + value;
    }
    else {
        elementObject.className = value;
    }
}


export function applyProperties(elementObject, properties) {
    if (properties != null) {
        for(let key in properties) {
            let value = properties[key];
            
            if (key === "parent") {
                value.appendChild(elementObject);
                //console.log("Appending " + elementObject + " to parent " + value);
            }
            
            else if (key == "style") {
                applyProperties(elementObject.style, value);
            }
            
            else if (key == "classes") {
                appendClasses(elementObject, value);
            }
            
            else {
                if (!(key in elementObject)) {
                    console.warn("Adding new property \"" + key + "\" with value \"" + value + "\".");
                }
                elementObject[key] = value;
            }            
        }
    }
}


export function isString(object) {
    return typeof object === 'string' || object instanceof String;
}


export function addChildren(elementObject, children) {
    if (children != null && children.length > 0) {
        children.forEach(function (child) {
            if (isString(child)) {
                elementObject.innerHTML += child;
            }
            else {
                elementObject.appendChild(child);
            }
        });
    }
}


export function classListContains(elementObject, className) {
    return typeof elementObject.classList !== "undefined" && elementObject.classList.contains(className);
}
