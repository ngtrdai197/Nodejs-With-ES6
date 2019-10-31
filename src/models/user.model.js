import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullName: {
        required: true,
        type: String
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => { delete ret._id, delete ret.__v }
    }
});

export const userModel = mongoose.model('user', userSchema);