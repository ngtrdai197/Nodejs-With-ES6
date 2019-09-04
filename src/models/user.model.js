import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullName: {
        required: true,
        type: String
    }
}, {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (obj, ret) => { delete ret._id, delete ret.__v }
        }
    });

export const userModel = mongoose.model('user', userSchema);