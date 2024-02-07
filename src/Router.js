/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


//regular expression for variable content;
//a variable's content ends with '/' or '?' or '&' or '#' or end of string.
const varRegEx = /[^/?&#\Z]*/y;


//check if character is letter
const isLetter = (ch) => {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}


//check if character is digit
const isDigit = (ch) => {
    return ch >= '0' && ch <= '9';
}


//parse variable name
const parseVariable = (route, index) => {
    if (isLetter(route[index])) {        
        for(++index; index < route.length; ++index) {
            const ch = route[index];
            if (!isLetter(ch) && !isDigit(ch) && ch !== '_') {
                break;
            }
        }
    }
    return index;
}


//matches a route against a route entry
const matchRoute = (routeEntry, route) => {
    let matchIndex = 0;

    //the match result
    let matchResult = {
        remainingCount: 0,
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
        matchResult.remainingCount = segment.segments.length - (segmentIndex + 1);
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
    const listener = (event) => router.onLocationChanged(event);
    window.addEventListener('popstate', listener);
    window.addEventListener('pageshow', listener);
}


//add a route to a router
function Router_addRoute(route, func) {
    //check the route
    if (!route || route === null || route.length === 0) {
        throw new Error("JSUI: Router: addRoute: invalid route.");
    }

    //check the func
    if (!func || func === null) {
        throw new Error("JSUI: Router: addRoute: invalid function.");
    }

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
        let varEndIndex = parseVariable(route, varStartIndex);

        //if the variable name length was 0, then there was an error
        if (varEndIndex === varStartIndex) {
            throw new Error("JSUI: Router: addRoute: invalid route variable in route " + route + ", at position " + varStartIndex);
        }

        //put a segment for variable
        segments.push({startIndex: varStartIndex, endIndex: varEndIndex, regex: varRegEx, varname: route.substring(varStartIndex, varEndIndex)});

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
        remainingCount : Number.MAX_SAFE_INTEGER
    };

    //search routes one by one, trying to find the best match
    for(const routeEntry of this.__routes) {
        //execute the match
        const matchResult = matchRoute(routeEntry, route);

        //if found new best result, store it
        if (matchResult.remainingCount < bestMatchResult.remainingCount) {
            bestRouteEntry = routeEntry;
            bestMatchResult = matchResult;

            //if the remaining count is zero, then the best possible match is found
            if (matchResult.remainingCount === 0) {
                break;
            }
        }
    }

    //found a matching route; invoke the route handler
    if (bestRouteEntry) {
        bestRouteEntry.func({
            router: this,
            matchedRoute: route.substring(0, matchResult.endIndex),
            unmatchedRoute: route.substring(matchResult.endIndex),
            variables: matchResult.variables
        });
    }

    //else could not find a matching route
    else {
        console.warn("JSUI: Router: activateRoute: cannot match route: '" + route + "'.");
    }
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


export const Router = ({trackLocationChange = false} = {}) => {
    const router = {};
    defineProperties(router);
    defineMethods(router);
    if (trackLocationChange) {
        addEventListeners(router);
    }
    return router;
}
