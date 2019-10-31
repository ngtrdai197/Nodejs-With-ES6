import express from 'express';
import { userController } from '../controllers';
import { validateToken } from '../middlewares';

export const routerUser = express.Router();

routerUser.get('/', validateToken(['admin']), userController.findAll);
routerUser.get('/:id', validateToken(['admin']), userController.findOneById);
// routerUser.get('/:id', userController.findOneById);
routerUser.post('/', userController.create);
routerUser.put('/', userController.update);
