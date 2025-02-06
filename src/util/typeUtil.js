/**
    Checks if a value is a string.
    @param value value to check.
    @return true if it is a string, false otherwise.
 */
export const isString = (value) => typeof value === 'string' || value instanceof String;

/**
    Checks if a value is a numbe.
    @param value value to check.
    @return true if it is a number, false otherwise.
 */
export const isNumber = (value) => (typeof value === 'number' || value instanceof Number) && !Number.isNaN(value);
