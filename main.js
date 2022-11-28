import * as html from "./src/html.js";
import * as layouts from "./src/layouts.js";
import * as buttons from "./src/buttons.js";

/*
let hbox1 = layouts.vbox({parent: document.body});
let btn1 = html.button({parent: hbox1, innerHTML: "Button 1"});
let btn2 = html.button({parent: hbox1, innerHTML: "Button 2"});
let spc1 = layouts.spacer({parent: hbox1}, html.button({}, "Button1"), "Yo!");
let btn3 = html.button({parent: hbox1, innerHTML: "Button 3"});
//let div1 = html.div({parent: document.body, style: { width: "10%", height: "100%", backgroundColor: "blue"}});
*/

let primaryButton = buttons.primaryButton({parent: document.body, disabled : enabled}, "Primary Button");
