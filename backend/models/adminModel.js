import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userName : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
}, {timestamps : true});

const adminModel = new mongoose.model('Admin', adminSchema);

export default adminModel;
