import { applyProperties } from "./util.js";
import { img } from "./html.js";


export function icon(properties, ...children) {
    let resultElement = img(null, ...children);
    
    //redefine the property 'src' to check for if the value has the '.svg' suffix;
    //if so, then set the style's mask-image property, otherwise call the original setter,
    //or set the original value
     Object.defineProperty(resultElement, "src", {
       get: function() {
           return Object.getOwnPropertyDescriptor(this.prototype, "src").get.call(this);
       },
       
       set: function(v) {  
           if (v.toLowerCase().endsWith(".svg")) {
               let str = "url(" + v + ")";
               this.style.maskImage = str;
               this.style.webkitMaskImage = str;
           }
           else {
               Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), "src").set.call(this, v);
           }
       }
    });
    
    //wire the background color of style to color
    //so as that setting the color changes the background color
    Object.defineProperty(resultElement.style, "color", {
        get: function() { 
            return this.backgroundColor;
        },
        
        set: function(v) {
            this.backgroundColor = v;
        }
    });
    
    //set the class name
    resultElement.className = "jsui-icon";
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;    
}