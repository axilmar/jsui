import { Server } from './src/Server.js';

const resources = [
    '/index.html', 
    '/main.js', 
    {
        path: '/public', 
        subtree: true
    },
    {
        path: '/src', 
        subtree: false
    },
    /\/test\/test1\/temp_[0-9]+.json/,
    /\/test\/test2/
]

const server = Server({resources, debug: true});

server.get('/api/data', (req, res) => {
    res.status(200).json({ data: [1, 2, 3]});
})

server.start();

