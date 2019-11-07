const app = require('./backend/app');
const http = require("http");

const normalizePort = val => {
    var port = parseInt(val);
    if (!isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        return error;
    }
    switch (error.code) {
        case "EACCES":
            console.error("requires priveleges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(port + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(port);
