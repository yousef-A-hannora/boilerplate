import mongoose from "mongoose";
const Schema = mongoose.Schema

const user = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const tokens = new Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    expires:{
        type:Date,
        required:true
    }
})

export const User = mongoose.model("User",user)
export const Token = mongoose.model("Token",tokens)