/**
    Checks if an object is a string.
    @param object object to check if it is a string.
    @return true if the object is a string, false otherwise.
 */
export const isString = (object) => typeof object === 'string' || object instanceof String;
