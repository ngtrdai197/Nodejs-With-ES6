import jwt from 'jsonwebtoken';
import { userRepo } from '../repositories';
import { constants } from '../common';

export const authController = {
    async signIn(req, res, next) {
        const { username, password } = req.body;
        const query = { username };
        try {
            const exist = await userRepo.findOne(query);
            if (!exist) {
                return res.status(400).json({ statusCode: 400, message: 'Login information is not valid. Check again !' });
            }
            const queryWithPass = { password };
            const user = await userRepo.findOne(queryWithPass);
            if (!user) {
                return res.status(400).json({ statusCode: 400, message: 'Login information is not valid. Check again !' });
            }
            const payload = { username: user.username, role: user.role, id: user.id };
            const token = await jwt.sign(payload, constants.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ statusCode: 200, token });
        } catch (error) {
            return res.status(500).json({ statusCode: 500, message: error });
        }
    }
}