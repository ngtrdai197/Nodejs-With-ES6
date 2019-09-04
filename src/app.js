import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { routerUser, routerProduct } from './routers';
import { connection } from './common';

const app = express();
app.use(cors());
app.options('*', cors());
connection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/user', routerUser);
app.use('/api/v1/product', routerProduct);

export default app;