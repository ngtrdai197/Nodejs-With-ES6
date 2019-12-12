import { blogRepo } from '../repositories'

export const blogController = {
  async findAll(req, res, next) {
    try {
      const blogs = await blogRepo.findAll()
      return res.status(200).send(blogs)
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
  async create(req, res, next) {
    const blog = req.body
    try {
      const result = await blogRepo.create(blog)
      if (result) {
        return res.status(200).send(result)
      }
      return res.status(400).json({ statusCode: 400, message: 'Bad request' })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
}
