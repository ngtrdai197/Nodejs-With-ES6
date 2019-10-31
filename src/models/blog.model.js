import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        trim: true,
        type: String
    },
    images: {
        type: [String],
        default: []
    },
    content: {
        required: true,
        trim: true,
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => { delete ret._id, delete ret.__v }
    }
});

export const blogModel = mongoose.model('blog', blogSchema);