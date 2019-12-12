import express from 'express'
import { authController } from '../controllers'
export const routeAuth = express.Router()

routeAuth.post('/', authController.signIn)
