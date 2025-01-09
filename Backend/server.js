const http = require('http');

const app = require('./app');
const port = process.env.PORT;
const {initializeSocket } = require('./socket');

const server = http.createServer(app);
initializeSocket(server)


server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    
})