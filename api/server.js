const express = require('express');
const cors = require('cors');
const ContactRouter = require('./contacts.routers');
require('dotenv').config();

const PORT = 3000;

module.exports = class ContactServer {
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
this.server.use('/contacts', ContactRouter);
    }

    startListening() {
        this.server.listen(PORT, () => {
            console.log("SERVER STARTED LISTENING ON PORT", PORT);
        });
    }
}

