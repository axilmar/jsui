/**
    Creates a theme.
    
    @param properties an object with the following properties:
 
    - decorateElement: decorate function. Signature: (element, newTreeState) : void.
        Invoked each time an element should be decorated.
    
    - undecorateElement: undecorate function. Signature: (element, oldTreeState) : void.
        Invoked each time an element should be undecorated. Optional.
        
    - redecorateElement: redecorate function. Signature: (element, oldTreeState, newTreeState) : void.
        Invoked each time an element should be redecorated.
        This function is optional; if not specified, then undecorate will be called, followed by redecorate.
        
    @return a theme object with the functions specified in properties object.
 */
export const Theme = (properties) => {
    const theme = {};
    theme.decorateElement = properties.decorateElement;
    theme.undecorateElement = properties.undecorateElement;
    theme.redecorateElement = properties.redecorateElement;
    return theme;
}