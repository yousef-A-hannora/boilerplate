import { Request,Response,NextFunction,ErrorRequestHandler } from "express"
import {AppError} from "../exceptions/customErrors"
const errorhandler:ErrorRequestHandler = (err:any,req:Request,res:Response,next:NextFunction):any=>{
    let {message} = err;
    let statusCode = 500;
    let errorNumber = 0
    if(err instanceof AppError){
        errorNumber = err.errorNumber;
        statusCode = err.statusCode;
    }
    return res.status(statusCode).json({
        message:message,
        number:errorNumber
    })
}

export default errorhandler;