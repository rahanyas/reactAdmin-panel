import mongoose from "mongoose";

const connectDb = async () => {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI)
      console.log('mongodb connected')
    } catch (error) {
       console.log(error)
    }
}

export default connectDb;