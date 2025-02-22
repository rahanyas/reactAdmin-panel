import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import adminModel from '../models/adminModel.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('token', token);
    
    if(!token){
      return res.status(401).json({msg : 'unauthorized: no token provided'})
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('decoded : ',decoded); 


    const user = await userModel.findById(decoded._id).select("-password");

    if(!user ){
      return res.status(401).json({msg : 'unauthorized: invalid token'})
    };

      req.user = user 
   
    next()
  } catch (error) {
    res.status(401).json({msg : 'Unauthorized: Invalid or expired token'})
  }
};

 
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('token', token);
    
    if(!token){
      return res.status(401).json({msg : 'unauthorized: no token provided'})
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('decoded : ',decoded); 
    
    const admin = await adminModel.findById(decoded._id).select("-password")


    if(!admin){
      return res.status(401).json({msg : 'unauthorized: invalid token'})
    };
  
      req.admin = admin 

    next()
  } catch (error) {
    res.status(401).json({msg : 'Unauthorized: Invalid or expired token'})
  }
}


