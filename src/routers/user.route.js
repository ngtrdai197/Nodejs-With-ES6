import express from 'express';
import { userController } from '../controllers';

export const routerUser = express.Router();

routerUser.get('/', userController.findAll);
routerUser.post('/', userController.create);
