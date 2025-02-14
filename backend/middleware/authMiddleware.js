import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({msg : 'unauthorized: no token provided'})
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('decoded : ',decoded);
      
    const user = await userModel.findById(decoded._id).select("-password");

    if(!user){
      return res.status(401).json({msg : 'unauthorized: invalid token'})
    };

    req.user = user;
    next()
  } catch (error) {
    res.status(401).json({msg : 'Unauthorized: Invalid or expired token'})
  }
};

export default requireAuth