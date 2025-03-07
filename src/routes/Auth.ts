import { Router, Request, Response } from "express";
import { Login,Refresh,Logout } from "../middlewares/Auth";
import ErrorHandler from "../utils/errorWrapper";

const AuthRouter = Router()


AuthRouter.post("/login",ErrorHandler(Login))
AuthRouter.get("/logout",ErrorHandler(Logout))
AuthRouter.post("/refresh",ErrorHandler(Refresh))

export default AuthRouter;