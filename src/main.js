import * as html from "./jsui/html.js";
import * as layout from "./jsui/layout.js";

let hbox1 = layout.vbox({parent: document.body});
let btn1 = html.button({parent: hbox1, innerHTML: "Button 1"});
let btn2 = html.button({parent: hbox1, innerHTML: "Button 2", style: { flexGrow: 1}});
let btn3 = html.button({parent: hbox1, innerHTML: "Button 3"});

//let div1 = html.div({parent: document.body, style: { width: "10%", height: "100%", backgroundColor: "blue"}});
