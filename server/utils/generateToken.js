import jwt from 'jsonwebtoken'
//import asyncHandler from '../middlewares/asyncHandler.js'

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '2d'
      })
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge:  2 * 24 * 60 * 60 * 1000,
        domain: 'localhost',
        path: '/'
      });
       console.log('TOKEN HERE', token)
}
export default generateToken