import * as html from "./src/html.js";
import * as layouts from "./src/layouts.js";
import * as buttons from "./src/buttons.js";
import * as icons from "./src/icons.js";

/*
let hbox1 = layouts.vbox({parent: document.body});
let btn1 = html.button({parent: hbox1, innerHTML: "Button 1"});
let btn2 = html.button({parent: hbox1, innerHTML: "Button 2"});
let spc1 = layouts.spacer({parent: hbox1}, html.button({}, "Button1"), "Yo!");
let btn3 = html.button({parent: hbox1, innerHTML: "Button 3"});
//let div1 = html.div({parent: document.body, style: { width: "10%", height: "100%", backgroundColor: "blue"}});
*/

//icons.icon({parent: document.body, src: "/temp/test.png"});
//icons.icon({parent: document.body, src: "/themes/material/icons/account.svg", style: {width:"32px", height:"32px", color: "red"}});

let primaryButton = buttons.primaryButton({parent: document.body, enabled : true}, 
    icons.icon({src: "/themes/material/icons/account.svg"}),
    //icons.icon({src: "/temp/test.png"}),
    "Primary Button",
    //icons.icon({src: "/temp/test.png"})
    );

