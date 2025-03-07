import { IRefreshTokenRepository } from "../Interfaces/IRefreshToken";
import * as JWT from "jsonwebtoken";
import { randomUUID,UUID } from "crypto";
import { Types } from "mongoose";

export class AuthService {
    constructor(private refreshTokenCROUD:IRefreshTokenRepository){}

    generateAccessToken(userId:string):string{
        const token = JWT.sign({userId:userId},process.env.SECRET_KEY as string,{expiresIn:'15m'})
        return token
    }

    generateRefreshToken():UUID{
        return randomUUID()
    }

    async storeRefreshToken(userId:string,expiresAt:number=30):Promise<UUID>{
        const token:UUID = this.generateRefreshToken()
        const expirationDate = new Date(Date.now() + expiresAt * 1000*60*60*24)
        await this.refreshTokenCROUD.Store(token, userId, expirationDate)
        return token
    }

    async verifyRefreshToken(token:string):Promise<string | null>{
        const tokenRecord = await this.refreshTokenCROUD.Verefy(token)

        return tokenRecord ? tokenRecord.userId : null;
    }

    async revokeRefreshToken(token:string){
        await this.refreshTokenCROUD.Delete(token)
    }
}