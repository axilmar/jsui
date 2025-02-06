/**
    Checks if the value is a string.
    @param value value to check.
    @return true if it is a string, false otherwise.
 */
export const isString = (value) => typeof value === 'string' || value instanceof String;
