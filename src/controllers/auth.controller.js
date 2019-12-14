import jwt from 'jsonwebtoken'
import { constants } from '../common'
import { userModel } from '../models/user.model'

export const authController = {
  async signIn(req, res, next) {
    const { username, hashPassword } = req.body
    try {
      const user = await userModel.findOne({ username })
      if (!user) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Login information is not valid. Check again !',
        })
      }
      const isValid = await userModel.validPassword(
        hashPassword,
        user.hashedPassword,
      )
      if (!isValid) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Login information is not valid. Check again !',
        })
      }
      const payload = { username: user.username, role: user.role, id: user.id }
      const token = await jwt.sign(payload, constants.SECRET_KEY, {
        expiresIn: '1h',
      })
      return res.status(200).json({ statusCode: 200, token })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ statusCode: 500, message: error })
    }
  },
}
