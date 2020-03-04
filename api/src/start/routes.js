import { Router } from 'express';

import ValidateMongooseObjIdMiddleware from '../middlewares/validateMongooseObjId';

import DeveloperController from '../app/controllers/DevelopersController';

import DeveloperStoreValidator from '../app/validators/DeveloperStoreValidator';

const routes = new Router();

routes.post('/developers', DeveloperStoreValidator, DeveloperController.store);
routes.get('/developers', DeveloperController.index);
routes.delete(
  '/developers/:developerId',
  ValidateMongooseObjIdMiddleware,
  DeveloperController.delete
);

export default routes;
