//setup the html element
document.documentElement.style.boxSizing = 'border-box';
document.documentElement.style.padding = '0';
document.documentElement.style.margin = '0';
document.documentElement.style.minWidth = '100%';
document.documentElement.style.minHeight = '100%';
document.documentElement.style.maxWidth = '100%';
document.documentElement.style.maxHeight = '100%';
document.documentElement.style.width = '100%';
document.documentElement.style.height = '100%';

//setup the document body element
document.body.style.boxSizing = 'border-box';
document.body.style.padding = '0';
document.body.style.margin = '0';
document.body.style.minWidth = '100%';
document.body.style.minHeight = '100%';
document.body.style.maxWidth = '100%';
document.body.style.maxHeight = '100%';
document.body.style.width = '100%';
document.body.style.height = '100%';
document.body.setAttribute("name", "document.body");
Object.defineProperty(document.body, '__theme', {
    configurable: false,
    enumerable: false,
    value: undefined,
    writable: true
});
Object.defineProperty(document.body, 'theme', {
    configurable: true,
    enumerable: true,
    get: () => document.body.__theme,
    set: (theme) => {
        document.body.__theme = theme;
        if (theme && theme !== null) {
            theme.applyToElement(document.body);
        }
        for(let child = document.body.firstElementChild; child !== null; child = child.nextElementSibling) {
            child.theme = theme;
        }
    }
});
document.body.className = 'Element document.body';
document.body.applyDecoration = (decoration) => {
    Object.assign(document.body.style, decoration.style);
}
document.fullName = "document.body";


//firefox upto and including version 122.0, 64-bit, has a bug:
//when mouse enters text node under input, the input receives dragleave.
export const isFirefox = navigator.userAgent.includes("Firefox");
