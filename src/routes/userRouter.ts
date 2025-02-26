import { Router,Request,Response  } from "express";
import { addUser,GetUser } from "../middlewares/UserMIddleware";
import errorWrapper from "../utils/errorWrapper";

const usersRouter = Router()

usersRouter.post("/user",  errorWrapper(addUser));

usersRouter.get("/user",  errorWrapper(GetUser));

export default usersRouter