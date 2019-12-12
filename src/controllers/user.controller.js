import { userRepo } from '../repositories'
import { createQuery } from '../common/mongoose/createQuery'

export const userController = {
  async findAll(req, res, next) {
    try {
      const query = userRepo.findAll()
      const conditions = { populate: '', selects: '-password' }
      const users = await createQuery(query, conditions)
      return res.status(200).send(users)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async findOneById(req, res, next) {
    try {
      const query = { _id: req.params.id }
      const users = await userRepo.findOne(query)
      return res.status(200).send(users)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async create(req, res, next) {
    const user = req.body

    try {
      const created = await userRepo.create(user)
      if (created) {
        return res.status(200).send(created)
      }
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Error - Bad request ...' })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async update(req, res, next) {
    const user = req.body
    try {
      const query = {
        username: user.username,
        user,
      }
      const result = await userRepo.update(query)
      if (result) {
        return res.status(200).send(result)
      }
      return res.status(400).json({ statusCode: 400, message: 'Bad request' })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
}
