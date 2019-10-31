import jwt from 'jsonwebtoken';
import { constants } from '../common'
export const validateToken = (roles) => {
    return async (req, res, next) => {
        const token = req.headers['x-access-token'];
        console.log(token);

        if (token) {
            jwt.verify(token, constants.SECRET_KEY, async (error, decoded) => {
                if (error) {
                    return res.status(401).send({ statusCode: 401, message: 'Token invalid' });
                }
                if (roles.findIndex(x => x === 'user') > -1 || decoded.role === 'admin') {
                    return next();
                } else {
                    return res.status(403).send({ statusCode: 403, message: 'You have not permisstion' });
                }
            });
        } else {
            res.status(401).json({ statusCode: 401, message: 'Not authorized' });
        }

    }
}