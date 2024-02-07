const serverModule = require('./src/Server.js');

const resources = [
    '/index.html', 
    '/main.js', 
    {
        folder: '/public', 
        subtree: true
    },
    {
        folder: '/src', 
        subtree: false
    }
]

const server = serverModule.Server({resources, debug: true});
