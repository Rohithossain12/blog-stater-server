import express from "express"
import { AuthController } from "./auth.controller";


const router = express.Router();



router.post('/auth/login', AuthController.login);
router.post('/auth/google', AuthController.loginWithGoogle);


export const authRouter = router;