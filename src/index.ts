import express,{ Express } from "express";
import connectDB from "./DB/connection"
import dotenv from "dotenv"
import usersRouter from "./middlewares/userMiddlewares"

dotenv.config()
connectDB()

const app:Express = express()

app.use(express.json())
app.use(usersRouter)

const PORT:number = Number(process.env.PORT) || 3000;
app.listen(PORT,()=>{
    console.log(`App started on http://127.0.0.1:${PORT}`)
})