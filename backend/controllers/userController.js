import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

function createToken (id){
  try {  
    const token = jwt.sign({id}, process.env.JWT_KEY, {expiresIn :'3d' });
    return token;

  } catch (error) {
    throw Error ('error occured while jwt signining')
  }
}

export const signUp = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const user = await userModel.signup(name, email, password);
    const token = createToken(user._id);
    console.log(token);   
    console.log(user);
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

    res.status(200).json({msg : 'login successfull', user})
    
  } catch (error) {
    console.log(error.message);
    res.status(400).json({msg : error.message})
  }
}