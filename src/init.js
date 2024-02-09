//setup the html element

document.documentElement.style.boxSizing = 'border-box';
document.documentElement.style.padding = 0;
document.documentElement.style.margin = 0;
document.documentElement.style.overflow = 'hidden';
document.documentElement.style.minHeight = '100%';
document.documentElement.style.height = '100%';
document.documentElement.style.maxHeight = '100%';

//setup the document body element

document.body.style.boxSizing = 'border-box';
document.body.style.padding = 0;
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.style.minHeight = '100%';
document.body.style.height = '100%';
document.body.style.maxHeight = '100%';

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
        //undecorate body
        if (document.body.__theme && document.body.__theme !== null) {
            document.body.__theme.undecorateElement(document.body);
        }

        //store theme
        document.body.__theme = theme;

        //decorate body
        if (theme && theme !== null) {
            theme.decorateElement(document.body);
        }

        //apply theme to children
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

const isFirefox = navigator.userAgent.includes("Firefox");

//various browsers bugs
export const hasDragEnterBug = isFirefox;
export const hasPopStateBug = isFirefox;
