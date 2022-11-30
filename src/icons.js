import { applyProperties } from "./util.js";
import { div } from "./html.js";


export function svgIcon(properties, ...children) {
    let resultElement = div(null, ...children);
    
    //define new property src; it's the svg source image
    Object.defineProperty(resultElement, "src", {
       get: function() {
           return this.srcUrl;
       },
       
       set: function(v) {  
           this.srcUrl = v;           
           this.style.mask = "url(" + v + ")";
       }
    });
    
    //wire the background color of style to color
    //so as that setting the color changes the background color
    /*Object.defineProperty(resultElement.style, "color", {
        get: function() { return this.backgroundColor; },
        set: function(v) { this.backgroundColor = v; }
    });*/
    
    //set the class name
    resultElement.className = "svg-icon";
    
    //set the given properties
    applyProperties(resultElement, properties);
    
    return resultElement;    
}
