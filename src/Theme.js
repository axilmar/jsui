/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


export const Theme = () => {
    //create the object
    const theme = {};

    //set the default properties
    theme.decorationFunctions = {};
    theme.undecorationFunctions = {};
    theme.decorations = {};

    //add the default decoration function for the element;
    //it finds the appropriate decorations for elements, then it applies them to the element
    theme.decorationFunctions['Element'] = (element) => {
        element.classList.forEach((className) => {
            const decoration = theme.decorations[className];
            if (decoration) {
                element.applyDecoration(decoration);
            }
        });
    }

    //add the default undecoration function for the element;
    //it creates an element of the same tag name with the given element,
    //then copies its style to the given element,
    //to effectively remove all styling.
    theme.undecorationFunctions['Element'] = (element) => {
        const tempElement = document.createElement(element.tagName);
        Object.assign(element.style, tempElement.style);
    }

    //set the decorate method
    theme.decorateElement = (element) => {
        element.classList.forEach((className) => {
            const decorationFunction = theme.decorationFunctions[className];
            if (decorationFunction) {
                decorationFunction(element);
            }
        });
    }

    //set the undecorate method
    theme.undecorateElement = (element) => {
        element.classList.forEach((className) => {
            const undecorationFunction = theme.undecorationFunctions[className];
            if (undecorationFunction) {
                undecorationFunction(element);
            }
        });
    }

    //applies this theme to the given element; 
    //first, it undecorates the element from its previous theme, 
    //then it decorates it by this theme
    theme.applyToElement = (element) => {
        if (element.theme) {
            element.theme.undecorateElement(element);
        }
        theme.decorateElement(element);
    }
    
    return theme;
}
