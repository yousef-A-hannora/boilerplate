import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const URI = String(process.env.MDB)



const connectDB =async ()=>{

    try{
        await mongoose.connect(URI,{})
        console.log('DB connected')
    }catch(err){
        console.error('Error connecting to DB: ',err)
    }
}

export default connectDB;