/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


//removes all elements that are decorative
const removeThemeDecorativeElements = (element) => {
    if (ThemeDecorationTag in element) {
        const parent = element.parentElement;
        if (parent !== null) {
            parent.removeChild(element);
        }
        return;
    }
    for(let child = element.firstElementChild; child !== null; ) {
        const next = child.nextElementSibling;
        removeThemeDecorativeElements(child);
        child = next;
    }
}


/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


/**
 * Special property name used to tag elements that are temporary and used only for theming.
 */    
export const ThemeDecorationTag = 'themeDecoration';


/**
 * Creates a theme object.
 * 
 * The Theme object
 * ----------------
 * 
 * The created theme object contains the following properties:
 * 
 *  -decorationFunctions: 
 *      a map of class names to functions with signature (element) => void.
 *      These functions are invoked for each entry of an element's class list,
 *      in the order contained in the element's class list. These functions
 *      are used to decorate an element per class.
 * 
 *  -undecorationFunctions: 
 *      a map of class names to functions with signature (element) => void.
 *      These functions are invoked for each entry of an element's class list,
 *      in the order contained in the element's class list. These functions
 *      are used to undecorate an element per class.
 * 
 *  -decorations:
 *      a map of class names to decorations. A decoration shall have the following form:
 *      {
 *          properties: { ... } //element properties
 *          style: { ... }      //element style
 *          styles: { ... }     //state to style map
 *          events: { ... }     //event name to event listener map
 *      }
 *      The contents of the above are exactly the same as in function 'Element'.
 * 
 * Example of creating, customizing, and applying a theme
 * ------------------------------------------------------
 * 
 * A theme is created by the function Theme():
 * 
 *      const myTheme = Theme();
 * 
 * Custom decorations are added for classes GreenButton, RedButton and BlueButton:
 * 
 *      myTheme.decorations["GreenButton"] = {
 *          style: {
 *              backgroundColor: 'green'
 *          }
 *      }
 * 
 *      myTheme.decorations["RedButton"] = {
 *          style: {
 *              backgroundColor: 'red'
 *          }
 *      }
 * 
 *      myTheme.decorations["BlueButton"] = {
 *          style: {
 *              backgroundColor: 'blue'
 *          }
 *      }
 * 
 * The buttons are created and added to the page:
 * 
 *      const greenButton = Element('button', {
 *          properties: {
 *              className: 'GreenButton',
 *              theme: myTheme
 *          }
 *      });
 *      document.body.append(greenButton);
 * 
 *      const redButton = Element('button', {
 *          properties: {
 *              className: 'RedButton',
 *              theme: myTheme
 *          }
 *      });
 *      document.body.append(redButton);
 * 
 *      const blueButton = Element('button', {
 *          properties: {
 *              className: 'BlueButton',
 *              theme: myTheme
 *          }
 *      });
 *      document.body.append(blueButton);
 * 
 * If a theme is changed while the application is running, then the theme must be applied again.
 * For example, in order to change the background color of GreenButton to 'lightgreen', the following
 * code must run:
 * 
 *      myTheme.decorations["GreenButton"].style.backgroundColor = 'lightgreen';
 *      greenButton.theme = myTheme;
 * 
 * In order to change the theme for every GreenButton in the application, the theme can be applied
 * either to document.body or to an ancestor element. For example:
 * 
 *      document.body.theme = myTheme;
 * 
 * A theme is applied to an element and all its descentants.
 * 
 * Styling the document.body
 * -------------------------
 * 
 * The document body gets a 'theme' property, just like any element created by the Element() function.
 * But the document body decoration does not have all the properties of a decoration an element can accept.
 * The only decoration recognized by document body is 'style'. 
 * 
 * The following example shows how to style the document body, using a theme:
 * 
 *      myTheme.decorations['document.body'] = {
 *          style: { ... }
 *      }
 *      document.body.theme = myTheme;
 * 
 * More dynamic styling using decoration functions
 * -----------------------------------------------
 * 
 * Sometimes it may not be enough to simply declare the decorations for an element's class.
 * A theme might require adding special elements to components, dynamically, as the component is decorated. 
 * This can be achieved by using decoration functions.
 * In the following example, the class 'SpecialButton' gets a special child element through a decoration function:
 * 
 *      //create the theme
 *      const myTheme = Theme();
 * 
 *      //setup a decoration function for class 'SpecialButton'
 *      myTheme.decorationFunctions['SpecialButton'] = (element) => {
 *          //name the special decoration so as that it can be removed by name.
 *          element.append(SpecialButtonDecoration({properties:{name: "specialDecoration"}}));
 *      }
 * 
 *      //setup an undecoration function for class 'SpecialButton'
 *      myTheme.undecorationFunctions['SpecialButton'] = (element) => {
 *          //remove special decoration by name
 *          element.removeChild(element.specialDecoration);
 *      }
 * 
 * In the above code, when myTheme is applied, the function that adds a special element to class 'SpecialButton' is invoked.
 * The code also defines an undecoration function, which removes the special decoration.
 * 
 * The special decoration is removed by name, using the 'add-a-named-child-element-as-a-property-of-parent' feature. 
 * But this isn't strictly required. The decorative element can be automatically removed, if a special property 'themeDecoration'
 * is added to the decoration. The library will automatically remove children with this property when an element is undecorated.
 * Let's see an example:
 * 
 *      //create the theme
 *      const myTheme = Theme();
 * 
 *      //setup a decoration function for class 'SpecialButton'
 *      myTheme.decorationFunctions['SpecialButton'] = (element) => {
 *          const specialButtonDecoration = SpecialButtonDecoration();
 *          specialButtonDecoration[ThemeDecorationTag] = '';
 *          element.append(specialButtonDecoration);
 *      }
 * 
 * In the above code, the decoration element is tagged by adding a property with a special name,
 * stored in global variable ThemeDecorationTag.
 * 
 * Then, when an element is undecorated, the default undecoration function removes all the elements with this property,
 * making the undecorate function redundant.
 * 
 * @returns a theme object.
 */
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

    //add the default undecoration function for the element, which does the following:
    //1) it removes all the decoration elements.
    //2) It removes all event listeners setup by the theme.
    theme.undecorationFunctions['Element'] = (element) => {
        //remove all decorative elements
        removeThemeDecorativeElements(element);

        //remove all the things defined in decorations
        element.classList.forEach((className) => {
            const decoration = theme.decorations[className];
            if (decoration && decoration !== null) {
                    if (decoration.events && decoration.events !== null) {
                        for(const eventName in events) {
                            const event = decoration.events[eventName];
                            if (event.listener) {
                                element.removeEventListener(eventName, event.listener, event.options || event.useCapture);
                            }
                            else {
                                element.removeEventListener(eventName, event);
                            }
                        }
                    }
                }
            });
    }

    //invokes the decoration functions for each class.
    theme.decorateElement = (element) => {
        element.classList.forEach((className) => {
            const decorationFunction = theme.decorationFunctions[className];
            if (decorationFunction) {
                decorationFunction(element);
            }
        });
    }

    //invokes the undecoration functions for each class.
    theme.undecorateElement = (element) => {
        element.classList.forEach((className) => {
            const undecorationFunction = theme.undecorationFunctions[className];
            if (undecorationFunction) {
                undecorationFunction(element);
            }
        });
    }

    return theme;
}
