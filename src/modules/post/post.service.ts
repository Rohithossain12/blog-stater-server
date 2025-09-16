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
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            authorId: true,
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





export const PostService = {
    createPost,
    getAllPosts
}