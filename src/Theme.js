/**
    Creates a theme.
    
    @param target target object to become a theme object.
    
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
export const Theme = (target, properties) => {
    target.decorateElement = properties.decorateElement;
    target.undecorateElement = properties.undecorateElement;
    target.redecorateElement = properties.redecorateElement;
    return target;
}