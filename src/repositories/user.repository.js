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
    },
    async findOne(query) {
        try {
            return await userModel.findOne(query);
        } catch (error) {
            throw error;
        }
    },
    async update(query) {
        try {
            const updated = await userModel.findOneAndUpdate(query.username, query.user);
            if (updated) return await userModel.findOne({ username: updated.username });
        } catch (error) {
            throw error;
        }
    }

}