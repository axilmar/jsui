import * as html from "./jsui/html.js";

var p = html.p({parent: document.body, innerHTML: "The quick brown fox"});
//var a1 = html.a({parent : document.body, href : "http://www.in.gr",  innerHTML : "Goto to in.gr", naming: "Link1"});

//var btn1 = html.button({parent : document.body, innerHTML: "Click me!", onclick: function(){ alert("You clicked a button!"); }});

html.p({parent: document.body, innerHTML: "Jumps over the lazy dog"}, html.button({innerHTML: "text"}));

html.ol({parent: document.body}, 
    html.li({innerHTML: "Item1"}),
    html.li({innerHTML: "Item2"}),
    html.li({}));
    