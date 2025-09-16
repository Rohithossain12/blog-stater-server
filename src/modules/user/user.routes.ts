
import express from "express"
import { UserController } from "./user.controller";

const router = express.Router();

router.get('/all-users', UserController.getAllUsers)
router.get('/user/:id', UserController.getUserById)
router.post('/user', UserController.createUser);
router.patch("/update/:id", UserController.updateUser)
router.delete("/delete/:id", UserController.deleteUser)



export const userRouter = router;