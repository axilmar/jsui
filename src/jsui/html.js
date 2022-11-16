

function applyObjectDefinition(elementObject, objectDefinition) {
    if (objectDefinition != null) {
        for(let key in objectDefinition) {
            let value = objectDefinition[key];
            
            //parent
            if (key === "parent") {
                value.appendChild(elementObject);
                //console.log("Appending " + elementObject + " to parent " + value);
            }
            
            //else property
            else if (key in elementObject) {
                elementObject[key] = value;
                //console.log("Setting property " + key + " to value " + value);
            }
            
            //else array of children
            else if (key === "children") {
                value.forEach(function (child) { 
                    //console.log("Appending child " + child + " to parent " + elementObject);
                    elementObject.appendChild(child); 
                });
            }
            
            //else unknown definition
            else {
                throw "Unsupported object definition key: \"" + key + "\"; value = \"" + value + "\"";
            }
        }
    }
}


function createElement(name, objectDefinition) {
    let resultElement = document.createElement(name);
    applyObjectDefinition(resultElement, objectDefinition);
    return resultElement;    
}


export function a(objectDefinition) {
    return createElement("a", objectDefinition);
}


export function abbr(objectDefinition) {
    return createElement("abbr", objectDefinition);
}


export function div(objectDefinition) {
    return createElement("div", objectDefinition);
}


export function p(objectDefinition) {
    return createElement("p", objectDefinition);
}
