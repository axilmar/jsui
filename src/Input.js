import { Element } from './Element.js';

/**
    Creates an input element (html 'input' tag).
    @param properties property object list.
    @return input element.
 */
export const Input = (...properties) => {
    return Element(document.createElement('input'), { className: 'Input' }, ...properties);
}

/**
    Creates an input button element (html 'input' tag with type = 'button').
    @param properties property object list.
    @return input button element.
 */
export const InputButton = (...properties) => {
    return Input({ className: 'InputButton', type: 'button' }, ...properties);
}

/**
    Creates an input checkbox element (html 'input' tag with type = 'checkbox').
    @param properties property object list.
    @return input checkbox element.
 */
export const InputCheckbox = (...properties) => {
    return Input({ className: 'InputCheckbox', type: 'checkbox' }, ...properties);
}

/**
    Creates an input color element (html 'input' tag with type = 'color').
    @param properties property object list.
    @return input color element.
 */
export const InputColor = (...properties) => {
    return Input({ className: 'InputColor', type: 'color' }, ...properties);
}

/**
    Creates an input date element (html 'input' tag with type = 'date').
    @param properties property object list.
    @return input date element.
 */
export const InputDate = (...properties) => {
    return Input({ className: 'InputDate', type: 'date' }, ...properties);
}

/**
    Creates an input datetime-local element (html 'input' tag with type = 'datetime-local').
    @param properties property object list.
    @return input datetime-local element.
 */
export const InputDateTimeLocal = (...properties) => {
    return Input({ className: 'InputDateTimeLocal', type: 'datetime-local' }, ...properties);
}

/**
    Creates an input email element (html 'input' tag with type = 'email').
    @param properties property object list.
    @return input email element.
 */
export const InputEmail = (...properties) => {
    return Input({ className: 'InputEmail', type: 'email' }, ...properties);
}

/**
    Creates an input file element (html 'input' tag with type = 'file').
    @param properties property object list.
    @return input file element.
 */
export const InputFile = (...properties) => {
    return Input({ className: 'InputFile', type: 'file' }, ...properties);
}

/**
    Creates an input hidden element (html 'input' tag with type = 'hidden').
    @param properties property object list.
    @return input hidden element.
 */
export const InputHidden = (...properties) => {
    return Input({ className: 'InputHidden', type: 'hidden' }, ...properties);
}

/**
    Creates an input image element (html 'input' tag with type = 'image').
    @param properties property object list.
    @return input image element.
 */
export const InputImage = (...properties) => {
    return Input({ className: 'InputImage', type: 'image' }, ...properties);
}

/**
    Creates an input month element (html 'input' tag with type = 'month').
    @param properties property object list.
    @return input month element.
 */
export const InputMonth = (...properties) => {
    return Input({ className: 'InputMonth', type: 'month' }, ...properties);
}

/**
    Creates an input number element (html 'input' tag with type = 'number').
    @param properties property object list.
    @return input number element.
 */
export const InputNumber = (...properties) => {
    return Input({ className: 'InputNumber', type: 'number' }, ...properties);
}

/**
    Creates an input password element (html 'input' tag with type = 'password').
    @param properties property object list.
    @return input password element.
 */
export const InputPassword = (...properties) => {
    return Input({ className: 'InputPassword', type: 'password' }, ...properties);
}

/**
    Creates an input radio element (html 'input' tag with type = 'radio').
    @param properties property object list.
    @return input radio element.
 */
export const InputRadio = (...properties) => {
    return Input({ className: 'InputRadio', type: 'radio' }, ...properties);
}

/**
    Creates an input range element (html 'input' tag with type = 'range').
    @param properties property object list.
    @return input range element.
 */
export const InputRange = (...properties) => {
    return Input({ className: 'InputRange', type: 'range' }, ...properties);
}

/**
    Creates an input reset element (html 'input' tag with type = 'reset').
    @param properties property object list.
    @return input reset element.
 */
export const InputReset = (...properties) => {
    return Input({ className: 'InputReset', type: 'reset' }, ...properties);
}

/**
    Creates an input search element (html 'input' tag with type = 'search').
    @param properties property object list.
    @return input search element.
 */
export const InputSearch = (...properties) => {
    return Input({ className: 'InputSearch', type: 'search' }, ...properties);
}

/**
    Creates an input submit element (html 'input' tag with type = 'submit').
    @param properties property object list.
    @return input submit element.
 */
export const InputSubmit = (...properties) => {
    return Input({ className: 'InputSubmit', type: 'submit' }, ...properties);
}

/**
    Creates an input tel element (html 'input' tag with type = 'tel').
    @param properties property object list.
    @return input tel element.
 */
export const InputTel = (...properties) => {
    return Input({ className: 'InputTel', type: 'tel' }, ...properties);
}

/**
    Creates an input text element (html 'input' tag with type = 'text').
    @param properties property object list.
    @return input text element.
 */
export const InputText = (...properties) => {
    return Input({ className: 'InputText', type: 'text' }, ...properties);
}

/**
    Creates an input time element (html 'input' tag with type = 'time').
    @param properties property object list.
    @return input time element.
 */
export const InputTime = (...properties) => {
    return Input({ className: 'InputTime', type: 'time' }, ...properties);
}

/**
    Creates an input url element (html 'input' tag with type = 'url').
    @param properties property object list.
    @return input url element.
 */
export const InputUrl = (...properties) => {
    return Input({ className: 'InputUrl', type: 'url' }, ...properties);
}

/**
    Creates an input week element (html 'input' tag with type = 'week').
    @param properties property object list.
    @return input week element.
 */
export const InputWeek = (...properties) => {
    return Input({ className: 'InputWeek', type: 'week' }, ...properties);
}
