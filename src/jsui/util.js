import "./init.js"


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
            
            else {
                if (!(key in elementObject)) {
                    console.warn("Adding new property \"" + key + "\" with value \"" + value + "\".");
                }
                elementObject[key] = value;
            }            
        }
    }
}


export function addChildren(elementObject, children) {
    if (children != null && children.length > 0) {
        children.forEach(function (child) {
            elementObject.appendChild(child);
        });
    }
}


