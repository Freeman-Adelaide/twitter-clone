import express from 'express';
import { signup, login, logout, getMe } from '../controllers/authControllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const authRouter = express.Router();

//get the currently authenticated user
authRouter.get("/me", protectRoute, getMe)

//signup
authRouter.post("/signup", signup)

//login
authRouter.post("/login", login)

//logout
authRouter.post("/logout", logout)



export default authRouter