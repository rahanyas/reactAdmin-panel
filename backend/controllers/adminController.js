import adminModel from "../models/adminModel.js";
import createToken from "../utils/tokenCreate.js";
import setTokenCookie from "../utils/tokenCookies.js";
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const adminLogin = async (req, res) => {
  try {
    const {userName, password} = req.body;
    
    const Admin = await adminModel.findOne({userName});
    if(!Admin){
      return res.status(401).json({msg : 'invalid username'})
    };

    const pass = await bcrypt.compare(password, Admin.password);

    if(!pass){
      return res.status(401).json({msg : 'wrong password'})
    };

    const token = createToken(Admin._id);
    setTokenCookie(res, token)
   
    return res.status(200).json({msg : 'welcome', admin : Admin._id})

  } catch (err) {
    console.log(err)
    return res.status(500).json({msg : err.message})
  }
};


export const getUsers = async (req, res) => {
  try {
    const admin = req.admin;
    console.log('admin',admin);
    if(!admin){
      return res.status(401).json({msg : 'unauthourized entry'})
    }
    const users = await userModel.find({});
    if(!users){
      return res.json({msg : 'no user found in database'})
    }
  
    console.log(users);
    
    return res.status(200).json({msg : 'fetched user successfullu', users})
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg : err.message})
  }

};

export const blockUser = async (req, res) => {
  try {
    const admin = req.admin;
    
    if(!admin){
     // console.log('admin not found');
     return res.status(401).json({msg : 'anAuthourized : admin not found'})
    };

    const {id} = req.body;
    if(!id){
     console.log('id not found')
    }
   //  console.log(id)

   const updateUser = await userModel.findByIdAndUpdate(id, {$set : { isBlocked : true}}, 
     {new : true}
   );

   if(!updateUser){
     return res.status(404).json({msg : 'user blocked failed'})
   }else{
     return res.status(200).json({msg : 'successfully blocked user'})
   }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({msg  : 'internal server error', err : err.message})
  }

};


export const unBlockUser = async (req, res) => {
  try {
    const admin = req.admin;
    if(!admin){
      return res.status(401).json({msg : 'unAuthorized : admin not found'})
    }
    
    const {id} = req.body;
    if(!id){
      return res.status(404).json({msg : 'id not found'})
    }
    console.log('id', id);
    const updateUser = await userModel.findByIdAndUpdate(id, {$set : {isBlocked : false}}, {new : true});
  if(updateUser){
    return res.status(200).json({msg : 'unblocked user'})
  }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({msg : 'internal server error', err: err.message})
  }
}