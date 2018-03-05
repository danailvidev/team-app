import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
import * as cors from 'cors';
const config = require('../config.json');

// routes
// var auth = require('./routes/auth.js')
// var post = require('./routes/post.js')
// var channel = require('./routes/channel.js')
// var user = require('./routes/user.js')
// var messages = require('./routes/messages.js')

import * as authRouter from "./routes/auth";

class App {

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.dbConnect();
    }

    public app: express.Application;

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({
            credentials: true,
            origin: config.cors.headers
        }))
    }

    private dbConnect(): void {
        mongoose.Promise = Promise // use es6 promise  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

        mongoose.connect(config.mongo_url, {
            useMongoClient: true,
        }, (err) => {
            if (!err) {
                console.log('db connected')
            } else {
                console.log('db err')
            }
        })
    }

    private routes(): void {
        
        this.app.use('/auth', authRouter)
        // this.app.use('/user', user.userRouter)
        // this.app.use('/post', post.postRouter)
        // this.app.use('/channel', channel.channelRouter)
        // this.app.use('/messages', messages.msgRouter)

    }

}

export default new App().app;