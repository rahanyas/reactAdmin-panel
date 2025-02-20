import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator'

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isBlocked : {
    type : Boolean,
    default : false
  }
});

userSchema.statics.signup =  async function (name, email, password){

  try {   
        const isExist = await this.findOne({email});
        if(isExist){
         throw Error ("this is email is already exist")
        }

        if(!validator.isEmail(email)){
          throw Error ('please enter valid email')
        }
        
         const salt = await bcrypt.genSalt(10);
         const hashedPass = await  bcrypt.hash(password, salt);
        
        const user =  await this.create({
          name,
          email , 
          password : hashedPass
         })
         
         return user ;
      } catch (error) {
         throw new Error (error.message)
      }
}

const userModel = new mongoose.model('Users', userSchema);

export default userModel;