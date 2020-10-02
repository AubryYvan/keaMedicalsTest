import express, { Application } from "express";
import * as bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';
import routes from './routes/index';


class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        routes(this.app);
    }

    private config(): void {
        dotenv.config();
        this.app.use(fileUpload({ createParentPath: true }));
        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
        this.app.use(serveStatic("public"));
    }
}

export default new Server().app;