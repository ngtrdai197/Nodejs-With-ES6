import mongoose from 'mongoose'
import { compareSync, hashSync, genSaltSync } from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: String,
    hashedPassword: String,
    fullName: {
      required: true,
      type: String,
    },
    role: {
      type: String,
      default: 'user',
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

userSchema.pre('save', async function save(next) {
  const salt = await genSaltSync(10)
  this.hashedPassword = await hashSync(this.hashedPassword, salt)
  await next()
})

userSchema.virtual('password').set(function(password) {
  console.log('virtual: ', password)
  this.hashedPassword = password
})
userSchema.virtual('password').get(function() {
  return this.hashPassword
})
userSchema.methods.hashPassword = async password => {
  const salt = await genSaltSync(10)
  return hashSync(password, salt)
}

userSchema.statics.validPassword = async function(password, hashPassword) {
  return await compareSync(password, hashPassword)
}

export const userModel = mongoose.model('user', userSchema)
