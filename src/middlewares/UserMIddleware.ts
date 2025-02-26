import { Request,Response,NextFunction } from "express";
import User from "../DB/schema/modules"
import {AppError,errorNumbers} from "../exceptions/customErrors"

export const addUser = async (req:Request,res:Response,next:NextFunction)=>{
        const {body:{username,email,password}} = req;
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        res.status(200).json(newUser);
        next()
}

export const GetUser = async (req:Request,res:Response)=>{
        const {body:{username}} = req;
        const myUser = await User.findOne({username:username});
        if(!myUser) throw new AppError("User Not found",400,errorNumbers.USER_ALREADY_EXISTS);
        res.json(myUser);
}
