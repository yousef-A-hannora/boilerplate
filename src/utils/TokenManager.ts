import * as JWT from "jsonwebtoken"
import dotenv from "dotenv"
import { randomUUID, UUID } from "crypto"
import { Token } from "../DB/schema/modules"


dotenv.config()
const secret = process.env.SECRET_KEY as string

export const generateRefreshToken = async (userId:string)=>{

}

export function test():Promise<string|number>{
    return new Promise((resolve, reject)=>{
        try{
            resolve(123);
        }catch{
            reject("not hello");
        }
    })
}

export const generateAccessToken = (userId:string)=>{
    const token = JWT.sign({user:userId},secret,{expiresIn:1000*60*15})
    return token
}
