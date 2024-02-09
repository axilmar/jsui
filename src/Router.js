/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


import { hasPopStateBug } from './init.js';
import { isString, escapeUrlRegExChars } from './util.js';


//varname regular expression
const varNameRegEx = /[a-zA-Z][a-zA-Z0-9_]*/y;


//regular expression for variable content;
//a variable's content ends with '/' or '?' or '&' or '#' or end of string.
const varContentRegEx = /[^/?&#\Z]*/y;


//parse variable name
const parseVariableName = (route, index) => {
    varNameRegEx.lastIndex = index;
    const m = varNameRegEx.exec(route);    
    return m ? varNameRegEx.lastIndex : index;
}


//matches a route against a route entry
const matchRoute = (routeEntry, route) => {
    let matchIndex = 0;

    //the match result
    let matchResult = {
        endIndex: 0,
        variables: {}
    }

    //match each segment from the current match index
    for(let segmentIndex = 0; segmentIndex < routeEntry.segments.length; ++segmentIndex) {
        const segment = routeEntry.segments[segmentIndex];

        //rewind the regular expression to start matching from the current match index
        segment.regex.lastIndex = matchIndex;

        //match the segment
        const match = segment.regex.exec(route);

        //if the segment did not match, stop
        if (match === null || match.index !== matchIndex) {
            break;
        }

        //set the match result
        matchResult.endIndex = segment.regex.lastIndex;

        //capture the value of a variable
        if (segment.varname) {
            matchResult.variables[segment.varname] = match[0];
        }

        //continue matching from last index
        matchIndex = segment.regex.lastIndex;
    }    

    return matchResult;
}


//define the router properties
const defineProperties = (router) => {
    //holds the last known path name
    Object.defineProperty(router, '__lastRoute', {
        configurable: false,
        enumerable: false,
        value: '',
        writable: true
    });

    //holds the routes
    Object.defineProperty(router, '__routes', {
        configurable: false,
        enumerable: false,
        value: {},
        writable: false
    });
}    


//define the router methods
const defineMethods = (router) => {
    router.addRoute = Router_addRoute;
    router.removeRoute = Router_removeRoute;
    router.activateRoute = Router_activateRoute;
    router.onLocationChanged = Router_locationChanged;
}


//adds the event listeners required for routing
const addEventListeners = (router) => {
    const listener = hasPopStateBug ? (event) => setTimeout(() => router.onLocationChanged(event), 0) : (event) => router.onLocationChanged(event);
    window.addEventListener('popstate', listener);
    window.addEventListener('pageshow', listener);
}


//add a route to a router
function Router_addRoute(route, func) {
    //check the route
    if (!route) {
        throw new Error("JSUI: Router: addRoute: invalid route");
    }

    //check the func
    if (!func) {
        throw new Error("JSUI: Router: addRoute: invalid function");
    }

    //if the route is a regular expression, then put in one segment that uses that regular expression.
    if (route instanceof RegExp) {
        this.__routes[route] = {
            route: route,
            segments: [{startIndex: 0, endIndex: route.source.length, regex: new RegExp(route.source.replaceAll('\\', ''), 'y')}],
            func: func
        };
        return;
    }

    //if the route isn't a string, then get the string from the object
    if (!isString(route)) {
        route = route.toString();
        if (!isString(route)) {
            throw new Error("JSUI: Router: addRoute: route is not a string or does not evaluate to a string");
        }
    }

    //escape characters that are special for regex that are not escaped yet
    route = escapeUrlRegExChars(route);

    //break down the route in segments based on variables
    const segments = [];
    let index = 0;
    while (true) {
        //find start of variable
        let varStartIndex = route.indexOf(':', index);

        //if not found, put the final segment
        if (varStartIndex < 0) {
            segments.push({startIndex: index, endIndex: route.length, regex: new RegExp(route.substring(index, route.length), 'y')});
            break;
        }

        //put a segment without variable
        if (varStartIndex > index) {
            segments.push({startIndex: index, endIndex: varStartIndex, regex: new RegExp(route.substring(index, varStartIndex), 'y')});
        }

        //actual var start is after ':'
        ++varStartIndex;

        //find the end of variable
        let varEndIndex = parseVariableName(route, varStartIndex);

        //if the variable name length was 0, then there was an error
        if (varEndIndex === varStartIndex) {
            throw new Error("JSUI: Router: addRoute: invalid route variable in route " + route + ", at position " + varStartIndex);
        }

        //put a segment for variable
        segments.push({startIndex: varStartIndex, endIndex: varEndIndex, regex: varContentRegEx, varname: route.substring(varStartIndex, varEndIndex)});

        //continue parsing from variable end
        index = varEndIndex;
    }

    //store the entry
    this.__routes[route] = {
        route: route,
        segments: segments,
        func: func
    };
}


//remove a route from a router
function Router_removeRoute(route) {
    if (route in this.__routes) {
        delete this.__routes[route];
    }
    else {
        throw new Error("JSUI: Router: removeRoute: route not found: " + route);
    }
}


//activate a route
function Router_activateRoute(route) {  
    //the best route entry found; the one that matches the most
    let bestRouteEntry = undefined;

    //the best match result
    let bestMatchResult = {
        endIndex : 0
    };

    //search routes one by one, trying to find the best match
    for(const registeredRoute in this.__routes) {
        const routeEntry = this.__routes[registeredRoute];

        //execute the match
        const matchResult = matchRoute(routeEntry, route);

        //if found new best result, store it
        if (matchResult.endIndex > bestMatchResult.endIndex) {
            bestRouteEntry = routeEntry;
            bestMatchResult = matchResult;

            //if the remaining count is zero, then the best possible match is found
            if (matchResult.endIndex === route.length) {
                break;
            }
        }
    }

    //found a matching route; invoke the route handler
    if (bestRouteEntry) {
        bestRouteEntry.func({
            router: this,
            registeredRoute: bestRouteEntry.route,
            requestedRoute: route,
            matchedRoute: route.substring(0, bestMatchResult.endIndex),
            unmatchedRoute: route.substring(bestMatchResult.endIndex),
            variables: bestMatchResult.variables
        });
        return true;
    }

    //else could not find a matching route
    console.warn("JSUI: Router: activateRoute: cannot match route: '" + route + "'.");
    return false;
}


//event handler for location changed
function Router_locationChanged() {
    const route = window.location.pathname + window.location.search + window.location.hash;
    if (route !== this.__lastRoute) {
        this.__lastRoute = route;
        this.activateRoute(route);
    }
}


/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


/**
 * Creates a router object.
 * 
 * The router object provides the following methods:
 * 
 * -addRoute(route, func):
 * 
 *      The function 'addRoute' is used to add a route and a route handler to a router.
 * 
 *      Parameters:
 * 
 *          -route:
 *              A regular expression string that can also contain variables in the form ':'<variable name>'.
 *              A variable name must conform to the following regular expression: [a-zA-Z][a-zA-Z0-9_]*. 
 * 
 *              Examples:
 * 
 *                  /foo
 *                  /foo/bar
 *                  /foo/bar/32
 *                  /\/foo\/bar/
 *                  /\/foo\/bar/:id
 *                  /foo/bar/:id?name=:name&count=:count
 *                  /foo/bar#intro
 * 
 *          -func:
 *              A function with the following signature: 
 * 
 *              ({router, registeredRoute, requestedRoute, matchedRoute, unmatchedRoute, variables})
 * 
 *              Parameters:
 * 
 *                  -router: the router object that invoked the function.
 *                  -registeredRoute: the string or regular expression that was used in addRoute.
 *                  -requestedRoute: the route to be activated.
 *                  -matchedRoute: the portion of the requested route that was matched.
 *                  -unmatchedRoute: the portion of the requested route that was not matched.
 *                  -variables: an object that contains properties for each variable parsed.
 * 
 *              The unmatched portion of the route can be passed to a sub-route in order to allow router nesting.
 * 
 * -removeRoute(route):
 * 
 *      Removes a previously added route. 
 * 
 *      Parameters:
 * 
 *          -route: the route string or regular expression as passed to 'addRoute'.
 * 
 * -activateRoute(route):
 * 
 *      Activates the given route. 
 * 
 *      Parameters:
 * 
 *          -route: the route to activate; it must be a string.
 * 
 *      Returns:
 * 
 *          -true: if a route was matched.
 *          -false: if a route was not matched.
 * 
 * -onLocationChanged(event):
 * 
 *      Callback function to be invoked on 'popstate' or 'pageshow' events.
 *      The default implementation invokes the method 'activateRoute' with parameter taken from window.location.
 * 
 *      Parameters:
 * 
 *          -event: a PopStateEvent for 'popstate' or PageTransitionEvent for 'pageshow'.
 * 
 * Route selection algorithm:
 * 
 *      The router selects the first route that consumes the biggest part of the requested route.
 * 
 *      Routes are examined in property-order of the internal object that is used for keeping the routes,
 *      which is the creation order for non-integer strings.
 * 
 * Example:
 * 
 *      //create the main router
 *      const mainRouter = Router();
 * 
 *      //add the main routes
 *      mainRouter.addRoute('/', (r) => { showApp(); });
 *      mainRouter.addRoute('/profile', (r) => { showProfile(); });
 *      mainRouter.addRoute('/about', (r) => { showAbout(); });
 * 
 *      //create a sub router for customers
 *      const customerRouter = SubRouter();
 *      mainRouter.addRoute('/customer', (r) => { customerRouter.activateRoute(r.unmatchedRoute); });
 * 
 *      //add customer routes
 *      customerRouter.addRoute('/:customerId', (r) => { showCustomer(r.variables.customerId); });
 *      customerRouter.addRoute('/:customerId/product', (r) => { showCustomerProducts(r.variables.customerId); });
 *      customerRouter.addRoute('/:customerId/product/:productId', (r) => { showCustomerProduct(r.variables.customerId, r.variables.productId); });
 * 
 * @param {boolean} trackLocation if set, then event handlers are added to monitor the address bar for changes. The default is true.
 *  Pass 'false' to this parameter to create a sub-router.
 * @returns the router object.
 */    
export const Router = ({trackLocation = true} = {}) => {
    const router = {};
    defineProperties(router);
    defineMethods(router);
    if (trackLocation) {
        addEventListeners(router);
    }
    return router;
}


/**
 * Creates a router that does not track location change.
 * Used for subrouters.
 * @returns a router.
 */
export const SubRouter = () => Router({trackLocation: false});
