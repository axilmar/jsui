import * as html from "./src/html.js";
import * as layouts from "./src/layouts.js";
import * as buttons from "./src/buttons.js";
import * as icons from "./src/icons.js";


let btn1 = buttons.filledButton({parent: document.body, enabled: true},
    icons.icon({src: "/themes/material/icons/account.svg"}),
    "Click me"
    );
