export class AppError extends Error{
    constructor(message:string,public statusCode:number,public errorNumber:errorNumbers){
        super(message);
        this.message = message
    }
}


export enum errorNumbers{
    USER_NOT_FOUND=1000,
    USER_ALREADY_EXISTS=1001,
    INCORRECT_PASSWORD=1002,
    GENERAL_ERROR=5555,
    TOKEN_MISSED=7001,
    WRONG_TOKEN=7002,
}

export const InternalError = new AppError("Something went wrong",500,errorNumbers.GENERAL_ERROR);
