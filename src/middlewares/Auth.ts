import { Request,Response,NextFunction } from "express";
import {User} from "../DB/schema/modules"
import {AppError,errorNumbers} from "../exceptions/customErrors"
import bcrypt from "bcrypt"
import {asyncMiddleware} from "../utils/errorWrapper"
import { AuthService } from "../services/AuthService";
import { MongooseRefreshTokenReposatory } from "../DB/Reposatories/RefreshTokenReposatory";



const MongoRefreshTokenRepo = new MongooseRefreshTokenReposatory()
const MongoDBAuthServce = new AuthService(MongoRefreshTokenRepo);


export const Login:asyncMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = req.body;
    const myUser =await User.findOne({
        email:email
    })

    if(!myUser){
        return next(new AppError("User Not exist",400,errorNumbers.USER_NOT_FOUND))
    }
    const isPasswordMatch =await bcrypt.compare(password,myUser.password)
    if(!isPasswordMatch){
        return next(new AppError("Wrong password",400,errorNumbers.INCORRECT_PASSWORD))
    }

    req.userId = myUser.id

    const AccessToken = MongoDBAuthServce.generateAccessToken(myUser.id as string)
    const RefreshToken = await MongoDBAuthServce.storeRefreshToken(myUser.id as string)

    res.status(200).json({"refreshToken":RefreshToken,"accessToken":AccessToken})
    next()
}



export const Refresh:asyncMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.header('Refresh-Token') || req.header('Authorization')?.replace('Bearer','')
    if(!token){
        return next(new AppError("No token provided",400,errorNumbers.TOKEN_MISSED))
    }
    // console.log(token)
    const userId = await MongoDBAuthServce.verifyRefreshToken(token as string)
    console.log(userId)
    if(!userId){
        return next(new AppError("Invalid token",400,errorNumbers.WRONG_TOKEN))
    }

    const newAccessToken = await MongoDBAuthServce.generateAccessToken(String(userId))
    res.status(200).json({"accessToken":newAccessToken})
    next()
}

export const Logout:asyncMiddleware =async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.header('Refresh-Token') || req.header('Authorization')?.replace('Bearer','')
    if(!token){
        return next(new AppError("You need to login first",400,errorNumbers.TOKEN_MISSED))
    }

    await MongoDBAuthServce.revokeRefreshToken(token)

    return res.status(200).json({ message: 'Logged out' });
}