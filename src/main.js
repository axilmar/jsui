import * as html from "./jsui/html.js";

var p = html.p({
    parent: document.body, 
    innerHTML: "The quick brown fox", 
    "children" : [
        html.a({
            parent : document.body, 
            href : "http://www.in.gr", 
            innerHTML : "Goto to in.gr"})
        ]
     });
