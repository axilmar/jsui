/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


import Express from 'express';
import pathModule from 'path';
import fsModule from 'fs';
import { testWholeString, testStringStart, isString, logger } from './util.js';


//checks the root folder
const processRootFolder = (rootFolder, debug) => {
    let result;

    //root folder not specified; return the current directory
    if (!rootFolder) {
        result = process.cwd();
    }

    else {
        //make the root folder absolute
        const fsPath = pathModule.resolve(process.cwd(), rootFolder);

        //if the root folder does not exist, throw error
        if (!fsModule.existsSync(fsPath)) {
            throw new Error("JSUI: Server: root folder does not exist: " + rootFolder);
        }

        result = fsPath;
    }

    if (debug) {
        logger.debug('JSUI: Server: root folder: ' + result);
    }

    return result;
}


//returns file type from regular expression;
//if the regexp source has an extension, then it is a file,
//otherwise it is a folder;
//also checks if regular expression starts with '/'
const checkRegExp = (regexp) => {
    const source = regexp.source;
    if (!source.startsWith('\\/')) {
        throw new Error("JSUI: Server: resources: resource does not start with '/': " + source);
    }
    const ext = pathModule.extname(source);
    return ext.length > 0 ? 'file' : 'folder';
}


//check file; returns resource path, filesystem path, file type
const checkFile = (rootFolder, resourcePath) => {
    //convert all \ to /
    resourcePath = resourcePath.replaceAll('\\', '/');

    //if it does not start with '/', throw exception
    if (!resourcePath.startsWith('/')) {
        throw new Error("JSUI: Server: resources: resource does not start with '/': " + resourcePath);
    }

    //get the filename of the file in respect of the root folder, excluding the leading '/'
    const fsPath = pathModule.resolve(rootFolder, resourcePath.substring(1));

    //check if the file exists
    if (!fsModule.existsSync(fsPath)) {
        throw new Error("JSUI: Server: resources: resource does not exist: " + resourcePath);
    }

    //determine type
    let type;
    const stats = fsModule.statSync(fsPath);
    if (stats.isFile()) {
        type = 'file';
    }
    else {
        type = 'folder';
    }    

    return { type, resourcePath, fsPath };
}


//processes the resources
const processResources = (rootFolder, resourceSpecs) => {
    //resource specs shall not be empty
    if (resourceSpecs.length === 0) {
        throw new Error("JSUI: Server: resources: empty resources; the default page must be defined as first entry");
    }

    const resources = [];

    for(const resourceSpec of resourceSpecs) {       
        let type;
        let resourceRegExp;
        let resourcePath;
        let fsPath;
        let subtree;

        //if resource is a string, it represents a file name or a folder name
        if (isString(resourceSpec)) {
            const r = checkFile(rootFolder, resourceSpec);
            type = r.type;
            resourcePath = r.resourcePath;
            fsPath = r.fsPath;
        }

        //else if the resource is a regular expression
        else if (resourceSpec instanceof RegExp) {
            type = checkRegExp(resourceSpec);
            resourceRegExp = resourceSpec;
        }

        //else the resource spec is an object
        else {
            //if the object does not contain a path property,
            //then the object is not well formed
            if (!resourceSpec.path) {
                throw new Error("JSUI: Server: resource does not specify 'path' property: " + JSON.stringify(resourceSpec));
            }

            //if path is not a regexp or a string
            //then the object is not well formed
            if (!isString(resourceSpec.path) && !(resourceSpec.path instanceof RegExp)) {
                throw new Error("JSUI: Server: resource.path shall be either a string or a regular expression.");
            }

            //if the path is a regular expression
            if (resourceSpec.path instanceof RegExp) {
                type = checkRegExp(resourceSpec.path);
                resourceRegExp = resourceSpec.path;
            }

            //else check for file/directory
            else {
                const r = checkFile(rootFolder, resourceSpec.path);
                type = r.type;
                resourcePath = r.resourcePath;
                fsPath = r.fsPath;
                subtree = type === 'folder' ? resourceSpec.subtree : undefined;
            }
        }
        
        //add a resource
        resources.push({
            type: type,
            resourceRegExp: resourceRegExp,
            resourcePath: resourcePath,
            filesystemPath: fsPath,
            subtree: subtree
        });
    }

    //check the first resource; it must be an html file
    const firstResourceExt = pathModule.extname(resources[0].resourcePath).toLowerCase();
    if (resources[0].type !== 'file' || !resources[0].filesystemPath || (firstResourceExt !== '.html' && firstResourceExt !== '.htm')) {
        throw new Error("JSUI: Server: first resource must reference an existing file with extension .html or .htm.");
    }

    return resources;
}


//finds a resource for a request path
const findResource = (resources, requestPath) => {
    for(const resource of resources) {

        //if the resource is a file
        if (resource.type === 'file') {

            //find file through regular expression
            if (resource.resourceRegExp) {
                if (testWholeString(resource.resourceRegExp, requestPath)) {
                    return resource;
                }
            }

            //else find file through specific filename
            else if (requestPath === resource.resourcePath) {
                return resource;
            }
        }

        //else if the resource is a folder
        else if (resource.type === 'folder') {
            const dirname = pathModule.dirname(requestPath);

            //find folder through regular expression
            if (resource.resourceRegExp) {

                //check for subtree
                if (resource.subtree) {
                    if (testStringStart(resource.resourceRegExp, dirname, '/')) {
                        return resource;
                    }
                }

                //else check whole dir path
                else {
                    if (testWholeString(resource.resourceRegExp, dirname)) {
                        return resource;
                    }
                }
            }

            //else find folder through specific filename
            else {

                //check for subtree
                if (resource.subtree) {
                    if (dirname.startsWith(resource.resourcePath) && 
                        (dirname.length === resource.resourcePath.length || dirname[resource.resourcePath.length] === '/'))
                    {
                        return resource;
                    }
                }

                //else check whole path
                else {
                    if (dirname === resource.resourcePath) {
                        return resource;
                    }
                }
            }
        }

        //else unknown type; something went wrong
        else {
            throw new Error("JSUI: Server: internal error: unknown resource type: " + resource.type);
        }
    }

    //no resource is found
    return null;
}


//define the additional properties of the server object
const defineProperties = (app, rootFolder, resources, debug) => {
    //the root folder
    Object.defineProperty(app, 'rootFolder', {
        configurable: false,
        enumerable: true,
        value: rootFolder,
        writable: false
    })    

    //the resources
    Object.defineProperty(app, 'resources', {
        configurable: false,
        enumerable: true,
        value: resources,
        writable: false
    })    

    //the debug flag
    Object.defineProperty(app, 'debug', {
        configurable: false,
        enumerable: true,
        value: debug,
        writable: false
    })    
}


//the default request handler
const defaultRequestHandler = (req, res) => {
    //if no file extension is specified, or there is a query involved, 
    //send the index page to allow client side routing
    if (pathModule.extname(req.path).length === 0 || Object.keys(req.query).length > 0) {
        if (req.app.debug) {
            logger.debug("JSUI: Server: serving index page for url " + req.originalUrl);
        }
        res.sendFile(req.app.resources[0].filesystemPath);
        return;
    }

    //check if the request path can be found as a file in resources
    const resource = findResource(req.app.resources, req.path);

    //if not found in resources, send 'not found'
    if (!resource) {
        logger.error("JSUI: Server: resource not found: " + req.path);
        res.sendStatus(404);
        return;
    }

    //convert the request path to a filesystem path
    const fsPath = pathModule.resolve(req.app.rootFolder, req.path.substring(1));

    //access the resource on the filesystem
    fsModule.access(fsPath, fsModule.constants.F_OK | fsModule.constants.R_OK, (err) => {

        //the file exists and it is readable; try to send it to the client
        if (!err) {
            if (req.app.debug) {
                logger.debug("JSUI: Server: file to send: " + fsPath);
            }
            res.sendFile(fsPath);
            return;
        }

        //error; send 404
        if (req.app.debug) {
            logger.debug("JSUI: Server: file cannot be read: " + fsPath);
        }
        logger.error("JSUI: Server: resource not found: " + req.path);
        res.sendStatus(404);
    });
}


/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


/**
 * Creates a Server object.
 * 
 * A server object is an Express server, created by calling express(), with added functionality for easing development
 * of single-page applications.
 * 
 * After creating the server object with this function, the routes must be specified, and then server.start() must be invoked
 * in order to start the server. Here is an example:
 * 
 *      const server = Server();
 *      server.get('/api/data', (req, res) => { console.log("data were requested"); } );
 *      server.start();
 * 
 * The server.start() function does two things:
 * 
 *      1) it installs a final handler for all get requests, which either returns a file from the resources specified 
 *          during server creation or serves the main page. This is useful for single-page applications.
 * 
 *      2) starts listening on the port specified in Server().
 * 
 * @param {string} rootFolder the root folder of the server; if not specified, then the current working directory is used.
 * 
 * @param {array} resources array of server resources available to the client.
 * 
 *  A resource is either a file or a directory from which files are retrieved by the client.
 * 
 *  File resources shall end with a filename extension (.html, .js, etc).
 * 
 *  Directory entries shall not end with a filename extension.
 * 
 *  Resources can be regular expressions.
 * 
 *  Each entry can have one of the following possible forms:
 * 
 *      1) file/directory entry as a string. Examples:
 * 
 *          '/pages/foo.html'
 *          '/pages'
 *          '/public/[a-zA-Z0-9_]+/[a-zA-Z0-9_].html'
 *          '/public/[a-zA-Z0-9_]+'
 * 
 *      2) file/directory entry as an object. Examples:
 * 
 *          {
 *              path: '/pages/foo.html'
 *          }
 * 
 *          {
 *              path: '/pages',
 *          }
 * 
 *          {
 *              path: '/pages',
 *              subtree: true
 *          }
 * 
 *          {
 *              path: '/p[a-zA-Z0-0_]+/foo.html'
 *          }
 * 
 *          {
 *              path: '/p[a-zA-Z0-0_]+'
 *          }
 * 
 *          {
 *              path: '/p[a-zA-Z0-0_]+',
 *              subtree: true
 *          }
 * 
 *     The 'subtree' flag is optional: if present, then files in subfolders will also be accessible.
 *     If not present, then files in subfolders will not be accessible.
 * 
 *     The default value for resources is the following:
 * 
 *          ["/index.html", "/main.js", "/favicon.ico", { path: "/public", subtree: true }]
 * 
 *     The above means that by default, the server can serve the following:
 * 
 *          - the file index.html; it is the 'main' html file.
 *          - the file main.js; it is the 'main' javascript file.
 *          - the file favicon.ico; the favorite icon.
 *          - the folder /public, where all the public files exist, either within /public or within its subfolders.
 * 
 *  The first entry of the resources is special: it must contain the default page to be returned for single-page applications.
 * 
 *  File resources shall always come with filename extensions. For example, a file resource named '/data/file' will cause
 *  an exception to be thrown. This is to ensure that file resources are separated from single-page application routing requests.
 * 
 * @param {number} port the port number used by the server; if not specified as a parameter or not specified in process.env,
 *      then 8080 is chosen.
 * 
 * @param {boolean} debug if true, debugging messages are sent to the console; false by default.
 * 
 * @returns an express app object.
 * 
 * @throws Error if:
 *      - the root folder does not exist.
 *      - if the first entry of resources does not represent an html file.
 *      - if a resource is not well-formed; a resource shall start with '/' and if specified as an object, 
 *          then it shall contain either 'file' or 'folder' property, but not both or none of them.
 *      - if a resource (i.e. file or folder) does not exist on the filesystem.
 *      - if a file resource does not have a filename extension.
 */    
export const Server = ({
    rootFolder, 
    resources = ["/index.html", "/main.js", "/favicon.ico", { path: "/public", subtree: true }], 
    port = process.env.PORT || 8080, 
    debug = false} = {}
    ) =>
{
    //create the server
    const app = Express();

    //process the root folder
    rootFolder = processRootFolder(rootFolder, debug);

    //process resources
    resources = processResources(rootFolder, resources);

    //create the default properties
    defineProperties(app, rootFolder, resources, resources[0], debug);

    //add a start method which installs the default request handler and listens to the port
    app.start = () => {
        //install the default request handler
        app.get('*', defaultRequestHandler);

        //listen to the specified port
        app.listen(port);
        logger.log("JSUI: Server: started listening on port " + port);
    }

    //returns the express app
    return app;
}
