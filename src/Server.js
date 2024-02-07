/******************************************************************************************************************************
    PRIVATE
 ******************************************************************************************************************************/


const Express = require('express');
const pathModule = require('path');
const fsModule = require('fs');


//checks the root folder
const processRootFolder = (rootFolder) => {
    //root folder not specified; return the current directory
    if (!rootFolder) {
        return process.cwd();
    }

    //make the root folder absolute
    const fsPath = pathModule.resolve(process.cwd(), rootFolder);

    //if the root folder does not exist, throw error
    if (!fsModule.existsSync(fsPath)) {
        throw new Error("JSUI: Server: root folder does not exist: " + rootFolder);
    }

    //return the absolute path for the root folder
    return fsPath;
}


//processes the resources
const processResources = (rootFolder, resourceSpecs) => {
    //resource specs shall not be empty
    if (resourceSpecs.length === 0) {
        throw new Error("JSUI: Server: resources: empty resources; the default page must be defined as first entry");
    }

    const resources = [];

    for(const resourceSpec of resourceSpecs) {        
        //must not define file and folder simultaneously
        if (resourceSpec.file && resourceSpec.folder) {
            throw new Error("JSUI: Server: resources: resource shall not contain both file and folder");
        }

        //take the resource path
        let resourcePath = resourceSpec.file ? resourceSpec.file : resourceSpec.folder ? resourceSpec.folder : resourceSpec.path ? resourceSpec.path : resourceSpec;
        resourcePath = resourcePath.replaceAll('\\', '/');

        //if the path does not start with separator, then throw exception
        if (!resourcePath.startsWith('/')) {
            throw new Error("JSUI: Server: resources: resource path does not start with '/': " + resourcePath);
        }

        //take the filesystem path
        const fsPath = pathModule.resolve(rootFolder, resourcePath.substring(1));

        //check if the path exists
        if (!fsModule.existsSync(fsPath)) {
            throw new Error("JSUI: Server: resources: resource does not exist: " + resourcePath);
        }

        //determine the type of the resource
        let type;
        if (resourceSpec.file) {
            type = 'file';
        }
        else if (resourceSpec.folder) {
            type = 'folder';
        }
        else {
            const stats = fsModule.statSync(fsPath);
            if (stats.isFile()) {
                type = 'file';
            }
            else {
                type = 'folder';
            }
        }

        //add a resource
        resources.push({
            type: type,
            resourcePath: resourcePath,
            filesystemPath: fsPath,
            subtree: resourceSpec.folder && resourceSpec.subtree ? true : undefined
        });
    }

    return resources;
}


//finds a resource for a request path
const findResource = (resources, requestPath) => {
    const dirname = pathModule.dirname(requestPath);

    for(const resource of resources) {

        //if the resource is a file, then check the exact path
        if (resource.type === 'file') {
            if (requestPath === resource.resourcePath) {
                return resource;
            }
        }

        //else check if the resource belongs to a folder or subfolder
        else if (resource.subtree) {
            if (dirname.startsWith(resource.resourcePath)) {
                return resource;
            }
        }

        //else check if the resource dir equals the resource path
        else {
            if (dirname === resource.resourcePath) {
                return resource;
            }
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
    //take the request extension
    const requestExtension = pathModule.extname(req.path);

    //if the resource extension is empty, then the request represents a route to be handled by the client;
    //therefore, return the index page
    if (requestExtension.length === 0) {
        res.sendFile(req.app.resources[0].filesystemPath);
        return;
    }

    //check if the request path can be found as a file in resources
    const resource = findResource(req.app.resources, req.path);

    //if not found in resources, send 404
    if (!resource) {
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
                console.debug("JSUI: Server: file to send: " + fsPath);
            }
            res.sendFile(fsPath);
            return;
        }

        //error; send 404
        if (req.app.debug) {
            console.error("JSUI: Server: file cannot be read: " + fsPath);
        }
        else {
            console.error("JSUI: Server: resource cannot be found: " + req.path);
        }
        res.sendStatus(404);
    });
}


/******************************************************************************************************************************
    PUBLIC
 ******************************************************************************************************************************/


const Server = ({rootFolder, resources = ["/index.html", "/main.js"], port = process.env.PORT || 8080, debug = false} = {}) => {
    //create the server
    const app = Express();

    //process the root folder
    rootFolder = processRootFolder(rootFolder);

    //process resources
    resources = processResources(rootFolder, resources);

    //create the default properties
    defineProperties(app, rootFolder, resources, resources[0], debug);

    //install the default request handler
    app.get('*', defaultRequestHandler);

    //listen to the specified port
    app.listen(port);
    console.log("JSUI: Server: started listening on port " + port);

    //returns the express app
    return app;
}


module.exports = { 
    Server
}
