import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
   let token;
   // Read jwt value from cookie;
   token = req.cookies.jwtoken;
   if(token) {
      
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          req.user = await User.findById(decoded.userId).select('-password')
          
      
          next()
      } catch (error) {
          console.log(error)
          res.status(401)
          throw new Error('Not authorized, token failed')
      }
   }else {
    console.log('OOPS, still NOT SHOWING UP FUCK YOU!')
    res.status(401)
    throw new Error('Not authorized, No token')
   }
})

const admin =  (req, res, next) => {
   if(req.user && req.user.isAdmin) {
     next()
   }else {
      res.status(401)
      throw new Error('Not authorized as an admin!')
   }
}

export { admin, protect }