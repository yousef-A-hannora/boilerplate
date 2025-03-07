import express,{ Express} from "express";
import connectDB from "./DB/connection"
import dotenv from "dotenv"
import usersRouter from "./routes/userRouter"
import errorhandler from "./middlewares/errorMiddleware"; 
import AuthRouter from "./routes/Auth";

// import mongoStore from "connect-mongo"
// import Session from "express-session"
// import mongoose from "mongoose";


dotenv.config()
connectDB()

const app:Express = express()

app.use(express.json())

// app.use(Session({
//     secret:String(process.env.SECRET_KEY),
//     resave:false,
//     saveUninitialized:false,
//     cookie:{maxAge:1000*60*60*24*7},
//     store:mongoStore.create({
//         client:mongoose.connection.getClient()
//     })
// }));

app.use("/api/v1/users/",usersRouter)
app.use("/api/v1/auth/",AuthRouter)
const PORT:number = Number(process.env.PORT) || 3000;


// app.get("/err",(req:Request,res:Response,next:NextFunction)=>{
//     next(new AppError("Error Happened successfully",400,errorNumbers.USER_NOT_FOUND))
// })


app.use(errorhandler)
app.listen(PORT,()=>{
    console.log(`App started on http://127.0.0.1:${PORT}`)
})