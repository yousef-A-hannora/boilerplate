//For:
//Single Responsibility Principle (SRP): Each class should have one reason to change.
//Dependency Inversion Principle (DIP): Depend on abstractions, not concrete implementations.

//----------------------------------------------------------
//Implement the interface with a Mongoose-based repository.
//----------------------------------------------------------


import {IRefreshTokenRepository} from "../../Interfaces/IRefreshToken"
import { Token } from "../schema/modules"


export class MongooseRefreshTokenReposatory implements IRefreshTokenRepository{
    async Store(token: string, userId: string, expiresAt: Date): Promise<void> {
        const newToken = await new Token({
            userId: userId,
            token: token,
            expires: expiresAt 
        })
        await newToken.save()
        if(!newToken) throw new Error("Failed to generate token");
    }

    async Delete(token: string):Promise<void>{
        const result = await Token.deleteOne({ token: token })
    }

    async Verefy(token: string): Promise<{ userId: string } | null> {
        const myToken = await Token.findOne({ token: token })
        console.log(token)
        if(!myToken || myToken.expires < new Date()){
            return null
        }
        return { userId: myToken.userId.toString() }
    }
}