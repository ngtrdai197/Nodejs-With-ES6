import mongoose, { Schema } from 'mongoose'
import { compareSync, hashSync, genSaltSync } from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    blogIds: {
      type: [{ type: String, ref: 'blog' }],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id, delete ret.__v
      },
    },
  },
)

userSchema.virtual('blogs', {
  ref: 'blog',
  localField: 'blogIds',
  foreignField: '_id',
  justOne: false,
})

userSchema.virtual('countBlogs', {
  ref: 'blog',
  localField: 'blogIds',
  foreignField: '_id',
  justOne: false,
  count: true,
})

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await genSaltSync(10)
    this.password = await hashSync(this.password, salt)
    await next()
  } catch (error) {
    await next(error)
  }
})

userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName
})

userSchema.statics.validPassword = async function(password, hashPassword) {
  return await compareSync(password, hashPassword)
}

export const userModel = mongoose.model('user', userSchema)
