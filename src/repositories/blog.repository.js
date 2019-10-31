import { blogModel } from '../models';

export const blogRepo = {
    async create(blog) {
        try {
            return await blogModel.create(blog);
        } catch (error) {
            throw error;
        }
    },
    async findAll() {
        try {
            return await blogModel.find();
        } catch (error) {
            throw error;
        }
    }
}