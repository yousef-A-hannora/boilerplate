//For:
//Dependency Inversion Principle (DIP): Depend on abstractions, not concrete
//Interface Segregation Principle (ISP): Clients shouldn’t depend on interfaces they don’t use.

//----------------------------------------------------------
//Start by defining an abstract interface to decouple the implementation from the usage.
//----------------------------------------------------------


export interface IRefreshTokenRepository {
    Store(token:string,userId:string,expiresAt:Date):Promise<void>;
    Verefy(token:string):Promise<{userId:string}|null>;
    Delete(token:string):Promise<void>;
}