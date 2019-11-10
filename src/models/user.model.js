import mongoose from 'mongoose';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';

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

userSchema.pre('save', async (next) => {

    if (this.isModified('password')) return next()
    const salt = await genSaltSync(10)
    await hashSync('this.password', salt)
    return next()
})

userSchema.static.hashPassword = async (password) => {
    console.log('hashPassword: ' + password);

    const salt = await genSaltSync(10);
    return hashSync(password, salt)
}

userSchema.statics.validPassword = (password, hashPassword) => {
    return compareSync(password, hashPassword)
}

export const userModel = mongoose.model('user', userSchema);