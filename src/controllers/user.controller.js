import { createQuery } from '../common/mongoose/createQuery'
import { userModel } from '../models'

export const userController = {
  async findAll(req, res, next) {
    try {
      const query = userModel.find()
      const conditions = { populate: '', selects: '-password' }
      const users = await createQuery(query, conditions)
      return res.status(200).send(users)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async findById(req, res, next) {
    try {
      const user = await userModel
        .findById(req.params.id)
        .populate('blogs countBlogs', 'title content')
      return res.status(200).send(user)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async create(req, res, next) {
    const { username, password, firstName, lastName } = req.body
    try {
      const newUser = new userModel({
        username,
        password,
        firstName,
        lastName,
      })
      const created = await newUser.save()
      return res.status(200).json(created)
    } catch (error) {
      // throw error
      console.log(error)
      return res.status(500).json({ statusCode: 500, error })
    }
  },
  async update(req, res, next) {
    const user = req.body
    try {
      const query = {
        username: user.username,
        user,
      }
      const result = await userModel.update(query)
      if (result) {
        return res.status(200).send(result)
      }
      return res.status(400).json({ statusCode: 400, message: 'Bad request' })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async findOne(req, res, next) {
    const { fullName } = req.query
    try {
      const conditions = {
        $or: [
          { firstName: { $regex: fullName, $options: 'i' } },
          { lastName: { $regex: fullName, $options: 'i' } },
        ],
      }
      const user = await userModel.findOne(conditions)

      return res.status(200).send(user)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
}
