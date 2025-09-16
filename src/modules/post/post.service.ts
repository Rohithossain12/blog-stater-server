import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    console.log(payload);
    const createdPost = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }

    })
    return createdPost;


}

const getAllPosts = async () => {
    const result = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            views: true,
            tags: true,
            authorId: true,
            author: {
                select: {
                    name: true,
                    email: true
                }
            },
            isFeatured: true,
            createdAt: true,
            updatedAt: true

        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return result;
}

const getPostById = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return result;

}


const updatePost = async (id: number, payload: Partial<Post>) => {
    const result = await prisma.post.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}


const deletePost = async (id: number) => {
    const result = await prisma.post.delete({
        where: {
            id
        }
    })
    return result;
}


export const PostService = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost
}