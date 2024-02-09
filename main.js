import { Element } from './src/Element.js';
import { Router } from './src/Router.js';
import { isString } from './src/util.js';

const div1 = Element('div', {}, "Hello world");
document.body.append(div1);

const div2 = Element('div', {}, Element('img', { properties: { src: '/public/images/logo.png' }}));
document.body.append(div2);

// const router = Router();

// const routeHandler = ({router, registeredRoute, requestedRoute, matchedRoute, unmatchedRoute, variables}) => {
//     console.log("Registered route:", registeredRoute);
//     console.log("Requested route:", requestedRoute);
//     console.log("matched route:", matchedRoute);
//     console.log("unmatched route:", unmatchedRoute);
//     console.log("variables:", JSON.stringify(variables));
// }

//router.addRoute('/test', routeHandler);
//router.addRoute(/\/test1\/test2/, routeHandler);
//router.addRoute('/test1', routeHandler);
//router.addRoute('/test1/test2/test3', routeHandler);
//router.addRoute('/test1/:param1?prop1=:param2', routeHandler);

//const r = /\/test1\//y;
//const m = r.exec('/test1/:param1');
//console.log(JSON.stringify(m), r.source.replaceAll('\\', ''));

//const subRouter = Router({trackLocation: false});
//router.addRoute('/test1/:param1?prop1=:param2', (r) => subRouter.activateRoute(r.unmatchedRoute));
//subRouter.addRoute('#bar', routeHandler);

