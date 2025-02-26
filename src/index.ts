import express,{ Express,Request,Response,NextFunction } from "express";
import connectDB from "./DB/connection"
import dotenv from "dotenv"
import usersRouter from "./routes/userRouter"
import errorhandler from "./middlewares/errorMiddleware"; 
import { AppError,errorNumbers } from "./exceptions/customErrors";

dotenv.config()
connectDB()

const app:Express = express()

app.use(express.json())
app.use(usersRouter)
const PORT:number = Number(process.env.PORT) || 3000;


// app.get("/err",(req:Request,res:Response,next:NextFunction)=>{
//     next(new AppError("Error Happened successfully",400,errorNumbers.USER_NOT_FOUND))
// })

app.use(errorhandler)

app.listen(PORT,()=>{
    console.log(`App started on http://127.0.0.1:${PORT}`)
})