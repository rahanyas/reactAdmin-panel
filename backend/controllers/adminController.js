import adminModel from "../models/adminModel.js";
import createToken from "../utils/tokenCreate.js";
import setTokenCookie from "../utils/tokenCookies.js";

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
  
}