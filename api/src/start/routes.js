import { Router } from 'express';

import DeveloperController from '../app/controllers/DevelopersController';

const routes = new Router();

routes.post('/developers', DeveloperController.store);

export default routes;
