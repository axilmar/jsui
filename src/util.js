/**
 * Checks if an object is a string.
 * @param {*} str object to check.
 * @returns true if the object is a string, false otherwise.
 */
export const isString = (str) => typeof str === 'string' || str instanceof String;


/**
 * Tests a whole string against a regular expression.
 * @param {RegExp} regExp regular expression.
 * @param {string} str to check.
 * @returns true if the whole string matched, false otherwise.
 */
export const testWholeString = (regExp, str) => {
    regExp = new RegExp(regExp, 'y');
    regExp.lastIndex = 0;
    return regExp.test(str) && regExp.lastIndex === str.length;
}


/**
 * Tests the string start against a regular expression.
 * @param {RegExp} regExp regular expression.
 * @param {string} str to check.
 * @param {string} matchEnd optional string to check if it exists at regExp.lastIndex after the test.
 * @returns true if the whole string matched, false otherwise.
 */
export const testStringStart = (regExp, str, matchEnd) => {
    regExp = new RegExp(regExp, { sticky: true });
    regExp.lastIndex = 0;
    return regExp.test(str) && (!matchEnd || str.indexOf(matchEnd, regExp.lastIndex) === regExp.lastIndex);
}


/**
 * Returns the current or given time in the following format: YYYY-MM-DD hh:mm::ss.mlls.
 * Useful for timestamps.
 * @param {Date} date date object to convert to timestamp; if not given, then a new Date is created for the current time.
 * @returns a timestamp string.
 */
export const Timestamp = (date) => {
    if (!date) {
        date = new Date();
    }
    const year = String(date.getFullYear()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(4, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}


/**
 * An object that prepends a timestamp onto a message.
 * It contains the methods debug(), error(), log(), trace() and warn().
 * It uses the console object for output.
 */
export const logger = {
    debug: (...args) => console.debug('[' + Timestamp() + ']', ...args),
    error: (...args) => console.error('[' + Timestamp() + ']', ...args),
    log  : (...args) => console.log  ('[' + Timestamp() + ']', ...args),
    trace: (...args) => console.trace('[' + Timestamp() + ']', ...args),
    warn : (...args) => console.warn ('[' + Timestamp() + ']', ...args),
}
