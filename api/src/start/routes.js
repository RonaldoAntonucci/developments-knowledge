import { Router } from 'express';

import DeveloperController from '../controllers/DevelopersController';

const routes = new Router();

routes.post('/developers', DeveloperController.store);

export default routes;
