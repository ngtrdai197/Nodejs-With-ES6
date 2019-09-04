import mongoose from 'mongoose';
import { constants } from './constants';
export const connection = async () => {
    const url = `mongodb://localhost:27017/${constants.DB_NAME}`;
    try {
        const result = await mongoose.connect(url, { useNewUrlParser: true });
        if (result) {
            console.log('Database is connected ...');
        }
    } catch (error) {
        throw error;
    }

}