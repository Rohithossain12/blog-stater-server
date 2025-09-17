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

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []
        const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });
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



const getPostById = async (req: Request, res: Response) => {
    try {
        const result = await PostService.getPostById(Number(req.params.id));
        res.status(httpStatus.OK).json({
            message: "Post fetched successfully",
            data: result
        })

    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch post",
            error: error.message || error,
        });
    }

}



const updatePost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.updatePost(Number(req.params.id), req.body)
        if (!result) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Post not found",
            });
        }

        res.status(httpStatus.OK).json({
            message: "Post updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update Post",
            error: error.message || error,
        });
    }
}




const deletePost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.deletePost(Number(req.params.id))
        if (!result) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Post not found",
            });
        }
        res.status(httpStatus.OK).json({
            message: "Post deleted successfully"
        });
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete post",
            error: error.message || error,
        });
    }
}



const getBlogStat = async (req: Request, res: Response) => {
    try {
        const stats = await PostService.getBlogStat();
        res.status(httpStatus.OK).json({
            message: "stats fetching successfully",
            stats
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "stats fetching error",
            error
        })
    }
}


export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost,
    getBlogStat
}