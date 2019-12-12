import express from 'express'
import { blogController } from '../controllers'
import { validateToken } from '../middlewares'
export const routerBlog = express.Router()

routerBlog.get('/', validateToken(['admin']), blogController.findAll)
routerBlog.post('/', blogController.create)
