import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import createToken from "../utils/tokenCreate.js";
import  setTokenCookie  from "../utils/tokenCookies.js";


export const signUp = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const user = await userModel.signup(name, email, password);
    
    const token = createToken(user._id);
    console.log(token);   
    console.log(user);

    setTokenCookie(res, token);

    res.json({msg : 'create a new user', user, token})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({msg : error.message})
  }

};


export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(400).json({msg : 'this email does not exist'})
    };
    const passCompare = await bcrypt.compare(password, user.password);

    if(!passCompare){
      return res.status(400).json({msg : 'wrong password'})
    }
    const token = createToken(user._id);
    setTokenCookie(res, token)
    res.status(200).json({msg : 'login successfull', user, })
    
  } catch (error) {
    console.log(error.message);
    res.status(400).json({msg : error.message})
  }
};


export const homePage = async (req, res) => {
    const user = req.user;
    if(user){
      console.log('user : ', user);
    };

    res.status(401).json({msg : 'got no user'})
}