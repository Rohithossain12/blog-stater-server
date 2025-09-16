import { Request, Response } from "express"
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.createUser(req.body);
        res.status(httpStatus.CREATED).json({
            message: "User created successfully",
            data: result,
        });

    } catch (error:any) {
        res.status(httpStatus.BAD_REQUEST).json({
            message:"Failed to create user",
            error:error.message ||error
        });
    }

}


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAllUsers();
        res.status(httpStatus.OK).json({
            message: "All users fetched successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch users",
            error: error.message || error,
        });
    }

}
const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getUserById(Number(req.params.id));
        res.status(httpStatus.OK).json({
            message: "User fetched successfully",
            data: result
        })

    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch user",
            error: error.message || error,
        });
    }

}



export const UserController = {
    createUser,
    getAllUsers,
    getUserById
}