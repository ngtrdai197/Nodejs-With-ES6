import { blogModel, userModel } from '../models'

export const blogController = {
  async findAll(req, res, next) {
    try {
      const blogs = await blogModel.findAll()
      return res.status(200).send(blogs)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async create(req, res, next) {
    const blog = req.body
    try {
      const result = await blogModel.create(blog)
      const user = await userModel.findOne({ _id: '5df4a40ca7e23d20a8b11d7f' })
      user.blogIds.push(result.id)
      await user.save()
      if (result) {
        return res.status(200).send(result)
      }
      return res.status(400).json({ statusCode: 400, message: 'Bad request' })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
}
