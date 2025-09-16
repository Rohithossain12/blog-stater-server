import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { PostService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.createPost(req.body)
        res.status(httpStatus.CREATED).json({
            message: "Post Created Successfully",
            data: result
        })

    } catch (error: any) {
        res.status(httpStatus.BAD_REQUEST).json({
            message: "Failed to create post",
            error: error.message || error
        });
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const result = await PostService.getAllPosts();
        res.status(httpStatus.OK).json({
            message: "All Post fetched successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch Post",
            error: error.message || error,
        });
    }

}




export const PostController = {
    createPost,
   getAllPosts
}