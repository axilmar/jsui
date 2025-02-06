import { defineInterfaceProperty } from '../core/properties.js';
import { Layout } from './Layout.js';
import { isString, isNumber } from '../util/typeUtil.js';

//parse '[name]'
const parseName = (value) => {
    if (value.startsWith('[') && value.endsWith(']')) {
        return value.substring(1, value.length - 1).trim();        
    }
    return null;
}

//parse '[name] value'.
const parseNameValuePair = (values, index) => {
    if (index < values.length - 1) {
        const name = parseName(values[index]);
        if (name) {
            const value = values[index + 1].trim();
            return { name, value };
        }
    }
    return null;
}

//process grid template value
const getGridTemplateValue = (value) => {
    if (!value) {
        return '';
    }
    
    //handle the 'repeat(N, type)' string
    const initialValue = value;
    value = value.trim();
    if (value.includes('repeat')) {
        value = value.split('(');
        if (value.length == 2) {
            value = value[1].split(')');
            if (value.length == 2) {
                value = value[0].split(',');
                if (value.length == 2) {
                    const length = Number(value[0].trim());
                    const type = value[1].trim();
                    const result = [];
                    for(let i = 0; i < length; ++i) {
                        result.push(type);
                    }
                    return result;
                }
            }
        }
        throw new Error("GridLayout: invalid grid template value: ", JSON.stringify(initialValue));
    }
    
    //split the value by ' ' 
    value = value.split(' ');
    
    //concatenate names
    const result = [];    
    for(let index = 0; index < value.length; ) {
        const nameValuePair = parseNameValuePair(value, index);
        if (nameValuePair) {
            result.push(nameValuePair);
            index += 2;
            continue;
        }
        result.push(value[index]);
        ++index;
    }
    
    return result;
}

//get the string when the column values are specified as an array
const joinGridTemplateValue = (values) => {
    const result = [];
    
    for(const value of values) {        
        if (isString(value)) {
            result.push(value);
            continue;
        }
        if (isString(value.name) && isString(value.value)) {
            result.push('[' + value.name + ']');
            result.push(value.value);
            continue;
        }
        throw new Error('GridLayout: invalid grid template value: ' + JSON.stringify(values));
    }
    
    return result.join(' ');
}

//get columns
const getColumns = (layout) => {
    return getGridTemplateValue(layout.gridTemplateColumns);
}

//set columns
const setColumns = (layout, value) => {
    if (isString(value)) {
        layout.gridTemplateColumns = value;
    }
    else if (isNumber(value)) {
        layout.gridTemplateColumns = 'repeat(' + value + ',1fr)';        
    }
    else if (Array.isArray(value)) {        
        layout.gridTemplateColumns = joinGridTemplateValue(value);
    }
    else {
        throw new Error('GridLayout: set columns: invalid value type: ' + typeof value);
    }
}

//get rows
const getRows = (layout) => {
    return getGridTemplateValue(layout.gridTemplateRows);
}

//set rows
const setRows = (layout, value) => {
    if (isString(value)) {
        layout.gridTemplateRows = value;
    }
    else if (isNumber(value)) {
        layout.gridTemplateRows = 'repeat(' + value + ',1fr)';        
    }
    else if (Array.isArray(value)) {        
        layout.gridTemplateRows = joinGridTemplateValue(value);
    }
    else {
        throw new Error('GridLayout: set rows: invalid value type: ' + typeof value);
    }
}

//constructor
function gridLayoutConstructor() {
    this.display = 'grid';
    this.justifyItems = 'center';
    this.alignItems = 'center';    
    defineInterfaceProperty(this, 'columns', getColumns, setColumns);
    defineInterfaceProperty(this, 'rows', getRows, setRows);
    
    //set the apply function
    this.apply = function(element) {
        for(const propertyName in this) {
            if (propertyName !== 'apply') {
                element.style[propertyName] = this[propertyName];
            }
        }
    }
}

/**
    Grid layout constructor.
    A grid layout is an algorithm that makes an element to have a grid display.
    Grid properties are applicable.
    For more information about grid: https://css-tricks.com/snippets/css/complete-guide-grid/
    
    <h3>Properties</h3>
    
    The following custom properties are defined:
    
        - columns:
        
            When set, it can be one of the following:
        
                - a number that indicates the number of columns; it sets the 'grid-template-columns' property to 'repeat(number, 1fr)'.                
                - a string; it sets the 'grid-template-columns' property.
                - an array that contains column values or {name, value} pairs; it sets the 'grid-template-columns' property from the array concatenation with a space character as a separator.
                
            When retrieved, it contains the contents of the property 'grid-template-columns' as an array.
            
        - rows:
        
            Similar to columns, but it uses the 'grid-template-rows' property.
                
    @param properties properties objects.
    @return layout object.
 */
export const GridLayout = (...properties) => {
    return Layout({ constructor: gridLayoutConstructor, className: 'GridLayout' }, ...properties);
}
