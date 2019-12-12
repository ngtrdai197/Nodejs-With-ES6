import { userModel } from '../models'

export const userRepo = {
  async create(user) {
    const { username, password, fullName } = user
    try {
      const newUser = new userModel({
        username,
        password,
        fullName,
      })
      return await newUser.save()
    } catch (error) {
      throw error
    }
  },
  findAll() {
    return userModel.find()
  },
  async findOne(query) {
    try {
      return await userModel.findOne(query)
    } catch (error) {
      throw error
    }
  },
  async update(query) {
    try {
      const updated = await userModel.findOneAndUpdate(
        query.username,
        query.user,
      )
      if (updated)
        return await userModel.findOne({ username: updated.username })
    } catch (error) {
      throw error
    }
  },
}
