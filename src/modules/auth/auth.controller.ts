import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const login = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.login(req.body);

        res.status(httpStatus.OK).json({
            success: true,
            message: "Login successfully",
            data: result,
        });
    } catch (error: any) {
        if (error.name === "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Invalid email or password",
                error: error.message,
            });
        }


        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong during login",
            error: error.message || error,
        });
    }
};







export const AuthController = {
    login
}
