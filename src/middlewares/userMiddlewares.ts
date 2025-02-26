import { Router,Request,Response  } from "express";
import User from "../DB/schema/modules"

const usersRouter = Router()

usersRouter.post("/user",async (req:Request,res:Response)=>{
    try{
        const {body:{username,email,password}} = req;
        const newUser =new User({
            username,
            email,
            password
        });
        await newUser.save();
        res.status(200).json(newUser);
    }catch(err){
        res.status(500).json({message:err})
    }
})

usersRouter.get("/user",async (req:Request,res:Response):Promise<any>=>{
    try{
        const {body:{username}} = req;
        const myUser = await User.findOne({username:username});
        if(!myUser) return res.status(400).send("User not found");
        return res.json(myUser);
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err});
    }
})

export default usersRouter