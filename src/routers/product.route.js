import express from 'express';
import { productController } from '../controllers'

export const routerProduct = express.Router();

routerProduct.get('/', productController.findAll);
routerProduct.post('/', productController.created)