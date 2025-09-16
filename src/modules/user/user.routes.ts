
import express from "express"
import { UserController } from "./user.controller";

const router = express.Router();

router.get('/all-users', UserController.getAllUsers)
router.get('/user/:id', UserController.getUserById)
router.post('/user', UserController.createUser);



export const userRouter = router;