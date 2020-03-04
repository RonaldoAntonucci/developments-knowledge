import './bootstrap';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import '../database';

import ExceptionHandler from '../app/exceptions/Handler';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(ExceptionHandler);
  }
}

export default new App().server;
