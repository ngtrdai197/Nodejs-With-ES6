import { userModel } from '../models';

export const userRepo = {
    async create(user) {
        try {
            return await userModel.create(user);
        } catch (error) {
            throw error;
        }
    },
    async findAll() {
        try {
            return await userModel.find();
        } catch (error) {
            throw error;
        }
    }
}