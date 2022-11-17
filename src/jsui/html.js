

function applyProperties(elementObject, properties) {
    if (properties != null) {
        for(let key in properties) {
            let value = properties[key];
            
            //parent
            if (key === "parent") {
                value.appendChild(elementObject);
                //console.log("Appending " + elementObject + " to parent " + value);
            }
            
            //else property
            else {
                if (!(key in elementObject)) {
                    console.warn("Adding new property \"" + key + "\" with value \"" + value + "\".");
                }
                elementObject[key] = value;
            }            
        }
    }
}


function addChildren(elementObject, children) {
    if (children != null && children.length > 0) {
        children.forEach(function (child) {
            elementObject.appendChild(child);
        });
    }
}


function createElement(name, properties, children) {
    let resultElement = document.createElement(name);
    applyProperties(resultElement, properties);
    addChildren(resultElement, children);
    return resultElement;    
}


export function a(properties, ...children) {
    return createElement("a", properties, children);
}


export function abbr(properties, ...children) {
    return createElement("abbr", properties, children);
}


export function address(properties, ...children) {
    return createElement("address", properties, children);
}


export function area(properties, ...children) {
    return createElement("area", properties, children);
}


export function article(properties, ...children) {
    return createElement("article", properties, children);
}


export function aside(properties, ...children) {
    return createElement("aside", properties, children);
}


export function audio(properties, ...children) {
    return createElement("audio", properties, children);
}


export function b(properties, ...children) {
    return createElement("b", properties, children);
}


export function base(properties, ...children) {
    return createElement("base", properties, children);
}


export function bdi(properties, ...children) {
    return createElement("bdi", properties, children);
}


export function bdo(properties, ...children) {
    return createElement("bdo", properties, children);
}


export function blockquote(properties, ...children) {
    return createElement("blockquote", properties, children);
}


export function br(properties, ...children) {
    return createElement("br", properties, children);
}


export function button(properties, ...children) {
    return createElement("button", properties, children);
}


export function canvas(properties, ...children) {
    return createElement("canvas", properties, children);
}


export function caption(properties, ...children) {
    return createElement("caption", properties, children);
}


export function cite(properties, ...children) {
    return createElement("cite", properties, children);
}


export function code(properties, ...children) {
    return createElement("code", properties, children);
}


export function col(properties, ...children) {
    return createElement("col", properties, children);
}


export function colgroup(properties, ...children) {
    return createElement("colgroup", properties, children);
}


export function data(properties, ...children) {
    return createElement("data", properties, children);
}


export function datalist(properties, ...children) {
    return createElement("datalist", properties, children);
}


export function dd(properties, ...children) {
    return createElement("dd", properties, children);
}


export function del(properties, ...children) {
    return createElement("del", properties, children);
}


export function details(properties, ...children) {
    return createElement("details", properties, children);
}


export function dfn(properties, ...children) {
    return createElement("dfn", properties, children);
}


export function dialog(properties, ...children) {
    return createElement("dialog", properties, children);
}


export function div(properties, ...children) {
    return createElement("div", properties, children);
}


export function dl(properties, ...children) {
    return createElement("dl", properties, children);
}


export function dt(properties, ...children) {
    return createElement("dt", properties, children);
}


export function em(properties, ...children) {
    return createElement("em", properties, children);
}


export function embed(properties, ...children) {
    return createElement("embed", properties, children);
}


export function fieldset(properties, ...children) {
    return createElement("fieldset", properties, children);
}


export function figcaption(properties, ...children) {
    return createElement("figcaption", properties, children);
}


export function figure(properties, ...children) {
    return createElement("figure", properties, children);
}


export function footer(properties, ...children) {
    return createElement("footer", properties, children);
}


export function form(properties, ...children) {
    return createElement("form", properties, children);
}


export function h1(properties, ...children) {
    return createElement("h1", properties, children);
}


export function h2(properties, ...children) {
    return createElement("h2", properties, children);
}


export function h3(properties, ...children) {
    return createElement("h3", properties, children);
}


export function h4(properties, ...children) {
    return createElement("h4", properties, children);
}


export function h5(properties, ...children) {
    return createElement("h5", properties, children);
}


export function h6(properties, ...children) {
    return createElement("h6", properties, children);
}


export function header(properties, ...children) {
    return createElement("header", properties, children);
}


export function hr(properties, ...children) {
    return createElement("hr", properties, children);
}


export function i(properties, ...children) {
    return createElement("i", properties, children);
}


export function iframe(properties, ...children) {
    return createElement("iframe", properties, children);
}


export function img(properties, ...children) {
    return createElement("img", properties, children);
}


export function input(properties, ...children) {
    return createElement("input", properties, children);
}


export function ins(properties, ...children) {
    return createElement("ins", properties, children);
}


export function kbd(properties, ...children) {
    return createElement("kbd", properties, children);
}


export function label(properties, ...children) {
    return createElement("label", properties, children);
}


export function legend(properties, ...children) {
    return createElement("legend", properties, children);
}


export function li(properties, ...children) {
    return createElement("li", properties, children);
}


export function link(properties, ...children) {
    return createElement("link", properties, children);
}


export function main(properties, ...children) {
    return createElement("main", properties, children);
}


export function map(properties, ...children) {
    return createElement("map", properties, children);
}


export function mark(properties, ...children) {
    return createElement("mark", properties, children);
}


export function meta(properties, ...children) {
    return createElement("meta", properties, children);
}


export function meter(properties, ...children) {
    return createElement("meter", properties, children);
}


export function nav(properties, ...children) {
    return createElement("nav", properties, children);
}


export function noscript(properties, ...children) {
    return createElement("noscript", properties, children);
}


export function object(properties, ...children) {
    return createElement("object", properties, children);
}


export function ol(properties, ...children) {
    return createElement("ol", properties, children);
}


export function optgroup(properties, ...children) {
    return createElement("optgroup", properties, children);
}


export function option(properties, ...children) {
    return createElement("option", properties, children);
}


export function output(properties, ...children) {
    return createElement("output", properties, children);
}


export function p(properties, ...children) {
    return createElement("p", properties, children);
}


export function param(properties, ...children) {
    return createElement("param", properties, children);
}


export function picture(properties, ...children) {
    return createElement("picture", properties, children);
}


export function pre(properties, ...children) {
    return createElement("pre", properties, children);
}


export function progress(properties, ...children) {
    return createElement("progress", properties, children);
}


export function q(properties, ...children) {
    return createElement("q", properties, children);
}


export function rp(properties, ...children) {
    return createElement("rp", properties, children);
}


export function rt(properties, ...children) {
    return createElement("rt", properties, children);
}


export function ruby(properties, ...children) {
    return createElement("ruby", properties, children);
}


export function s(properties, ...children) {
    return createElement("s", properties, children);
}


export function samp(properties, ...children) {
    return createElement("samp", properties, children);
}


export function script(properties, ...children) {
    return createElement("script", properties, children);
}


export function section(properties, ...children) {
    return createElement("section", properties, children);
}


export function select(properties, ...children) {
    return createElement("select", properties, children);
}


export function small(properties, ...children) {
    return createElement("small", properties, children);
}


export function source(properties, ...children) {
    return createElement("source", properties, children);
}


export function span(properties, ...children) {
    return createElement("span", properties, children);
}


export function strong(properties, ...children) {
    return createElement("strong", properties, children);
}


export function style(properties, ...children) {
    return createElement("style", properties, children);
}


export function sub(properties, ...children) {
    return createElement("sub", properties, children);
}


export function summary(properties, ...children) {
    return createElement("summary", properties, children);
}


export function sup(properties, ...children) {
    return createElement("sup", properties, children);
}


export function svg(properties, ...children) {
    return createElement("svg", properties, children);
}


export function table(properties, ...children) {
    return createElement("table", properties, children);
}


export function tbody(properties, ...children) {
    return createElement("tbody", properties, children);
}


export function td(properties, ...children) {
    return createElement("td", properties, children);
}


export function template(properties, ...children) {
    return createElement("template", properties, children);
}


export function textarea(properties, ...children) {
    return createElement("textarea", properties, children);
}


export function tfoot(properties, ...children) {
    return createElement("tfoot", properties, children);
}


export function th(properties, ...children) {
    return createElement("th", properties, children);
}


export function thead(properties, ...children) {
    return createElement("thead", properties, children);
}


export function time(properties, ...children) {
    return createElement("time", properties, children);
}


export function title(properties, ...children) {
    return createElement("title", properties, children);
}


export function tr(properties, ...children) {
    return createElement("tr", properties, children);
}


export function track(properties, ...children) {
    return createElement("track", properties, children);
}


export function u(properties, ...children) {
    return createElement("u", properties, children);
}


export function ul(properties, ...children) {
    return createElement("ul", properties, children);
}


export function var_(properties, ...children) {
    return createElement("var", properties, children);
}


export function video(properties, ...children) {
    return createElement("video", properties, children);
}


export function wbr(properties, ...children) {
    return createElement("wbr", properties, children);
}


