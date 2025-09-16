
import express from "express"
import { UserController } from "./user.controller";

const router = express.Router();

router.get('/all-users', UserController.getAllUsers)
router.get('/user/:id', UserController.getUserById)
router.post('/create-user', UserController.createUser);
router.patch("/update-user/:id", UserController.updateUser)
router.delete("/delete-user/:id", UserController.deleteUser)



export const userRouter = router;