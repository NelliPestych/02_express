const express = require('express');
const cors = require('cors');
const userRouter = require('./index');
require('dotenv').config();

module.exports = class UsersServer {
    constructor() {
        this.server = null;
    }

    start() {
        this.initServer();
        this.initMiddlewares();
        this.initRoutes();
        this.startListening();
    }
    
    initServer() {
        this.server = express();
    }

    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(cors({ origin: "http://localhost:3000" }));
    }

    initRoutes() {
this.server.use('/contacts', userRouter);
    }

    startListening() {
        this.server.listen(process.env.PORT, () => {
            console.log("SERVER STARTED LISTENING ON PORT", process.env.PORT);
        });
    }
}

