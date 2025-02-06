import { Element } from './Element.js';

/**
    Creates an input element (html 'input' tag).
    @param properties property object list.
    @return input element.
 */
export const input = (...properties) => {
    return Element(document.createElement('input'), { className: 'input' }, ...properties);
}

/**
    Creates an input button element (html 'input' tag with type = 'button').
    @param properties property object list.
    @return input button element.
 */
export const inputButton = (...properties) => {
    return input({ className: 'inputButton', type: 'button' }, ...properties);
}

/**
    Creates an input checkbox element (html 'input' tag with type = 'checkbox').
    @param properties property object list.
    @return input checkbox element.
 */
export const inputCheckbox = (...properties) => {
    return input({ className: 'inputCheckbox', type: 'checkbox' }, ...properties);
}

/**
    Creates an input color element (html 'input' tag with type = 'color').
    @param properties property object list.
    @return input color element.
 */
export const inputColor = (...properties) => {
    return input({ className: 'inputColor', type: 'color' }, ...properties);
}

/**
    Creates an input date element (html 'input' tag with type = 'date').
    @param properties property object list.
    @return input date element.
 */
export const inputDate = (...properties) => {
    return input({ className: 'inputDate', type: 'date' }, ...properties);
}

/**
    Creates an input datetime-local element (html 'input' tag with type = 'datetime-local').
    @param properties property object list.
    @return input datetime-local element.
 */
export const inputDateTimeLocal = (...properties) => {
    return input({ className: 'inputDateTimeLocal', type: 'datetime-local' }, ...properties);
}

/**
    Creates an input email element (html 'input' tag with type = 'email').
    @param properties property object list.
    @return input email element.
 */
export const inputEmail = (...properties) => {
    return input({ className: 'inputEmail', type: 'email' }, ...properties);
}

/**
    Creates an input file element (html 'input' tag with type = 'file').
    @param properties property object list.
    @return input file element.
 */
export const inputFile = (...properties) => {
    return input({ className: 'inputFile', type: 'file' }, ...properties);
}

/**
    Creates an input hidden element (html 'input' tag with type = 'hidden').
    @param properties property object list.
    @return input hidden element.
 */
export const inputHidden = (...properties) => {
    return input({ className: 'inputHidden', type: 'hidden' }, ...properties);
}

/**
    Creates an input image element (html 'input' tag with type = 'image').
    @param properties property object list.
    @return input image element.
 */
export const inputImage = (...properties) => {
    return input({ className: 'inputImage', type: 'image' }, ...properties);
}

/**
    Creates an input month element (html 'input' tag with type = 'month').
    @param properties property object list.
    @return input month element.
 */
export const inputMonth = (...properties) => {
    return input({ className: 'inputMonth', type: 'month' }, ...properties);
}

/**
    Creates an input number element (html 'input' tag with type = 'number').
    @param properties property object list.
    @return input number element.
 */
export const inputNumber = (...properties) => {
    return input({ className: 'inputNumber', type: 'number' }, ...properties);
}

/**
    Creates an input password element (html 'input' tag with type = 'password').
    @param properties property object list.
    @return input password element.
 */
export const inputPassword = (...properties) => {
    return input({ className: 'inputPassword', type: 'password' }, ...properties);
}

/**
    Creates an input radio element (html 'input' tag with type = 'radio').
    @param properties property object list.
    @return input radio element.
 */
export const inputRadio = (...properties) => {
    return input({ className: 'inputRadio', type: 'radio' }, ...properties);
}

/**
    Creates an input range element (html 'input' tag with type = 'range').
    @param properties property object list.
    @return input range element.
 */
export const inputRange = (...properties) => {
    return input({ className: 'inputRange', type: 'range' }, ...properties);
}

/**
    Creates an input reset element (html 'input' tag with type = 'reset').
    @param properties property object list.
    @return input reset element.
 */
export const inputReset = (...properties) => {
    return input({ className: 'inputReset', type: 'reset' }, ...properties);
}

/**
    Creates an input search element (html 'input' tag with type = 'search').
    @param properties property object list.
    @return input search element.
 */
export const inputSearch = (...properties) => {
    return input({ className: 'inputSearch', type: 'search' }, ...properties);
}

/**
    Creates an input submit element (html 'input' tag with type = 'submit').
    @param properties property object list.
    @return input submit element.
 */
export const inputSubmit = (...properties) => {
    return input({ className: 'inputSubmit', type: 'submit' }, ...properties);
}

/**
    Creates an input tel element (html 'input' tag with type = 'tel').
    @param properties property object list.
    @return input tel element.
 */
export const inputTel = (...properties) => {
    return input({ className: 'inputTel', type: 'tel' }, ...properties);
}

/**
    Creates an input text element (html 'input' tag with type = 'text').
    @param properties property object list.
    @return input text element.
 */
export const inputText = (...properties) => {
    return input({ className: 'inputText', type: 'text' }, ...properties);
}

/**
    Creates an input time element (html 'input' tag with type = 'time').
    @param properties property object list.
    @return input time element.
 */
export const inputTime = (...properties) => {
    return input({ className: 'inputTime', type: 'time' }, ...properties);
}

/**
    Creates an input url element (html 'input' tag with type = 'url').
    @param properties property object list.
    @return input url element.
 */
export const inputUrl = (...properties) => {
    return input({ className: 'inputUrl', type: 'url' }, ...properties);
}

/**
    Creates an input week element (html 'input' tag with type = 'week').
    @param properties property object list.
    @return input week element.
 */
export const inputWeek = (...properties) => {
    return input({ className: 'inputWeek', type: 'week' }, ...properties);
}
