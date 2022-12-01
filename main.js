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

/*
let primaryButton = buttons.primaryButton({parent: document.body, disabled : true, classes: ""}, 
    icons.svgIcon({src: "/themes/material/icons/account.svg"}),
    "Primary Button");
 */

//icons.svgIcon({parent: document.body, src: "/themes/material/icons/account.svg", style:{width:"18px", height:"18px", color: "red"}});


//html.img({parent: document.body, style: {width:"64px", height: "64px", maskImage: "url(/themes/material/icons/account.svg)", backgroundColor: "red"}});


icons.icon({parent: document.body, src: "/temp/test.png"});
icons.icon({parent: document.body, src: "/themes/material/icons/account.svg", style: {width:"32px", height:"32px", color: "red"}});