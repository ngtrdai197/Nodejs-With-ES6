import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { routerUser, routerBlog, routeAuth } from './routers'
import { connection } from './common'

export const app = express()

app.use(helmet()) // secure your Express app by setting various Http headers
app.use(cors())
app.options('*', cors())
app.use(morgan('dev'))
connection()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/user', routerUser)
app.use('/api/v1/blog', routerBlog)
app.use('/api/v1/auth', routeAuth)
