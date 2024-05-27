import { Router } from "express";
import { signIn, signUp } from "../controllers/employee";
const authenication = Router()

authenication.post('/auth/register', signUp)
authenication.post('/auth/login', signIn)

export default authenication