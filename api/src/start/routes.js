import { Router } from 'express';

import DeveloperController from '../app/controllers/DevelopersController';

import DeveloperStoreValidator from '../app/validators/DeveloperStoreValidator';

const routes = new Router();

routes.post('/developers', DeveloperStoreValidator, DeveloperController.store);
routes.get('/developers', DeveloperController.index);

export default routes;
