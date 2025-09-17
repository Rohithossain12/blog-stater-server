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

const getAllPosts = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean
}) => {
    console.log({ isFeatured });
    const skip = (page - 1) * limit
    const where: any = {
        AND: [
            search && {
                OR: [

                    { title: { contains: search, mode: "insensitive" } },
                    { content: { contains: search, mode: "insensitive" } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured }
        ].filter(Boolean)
    };

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where
    });

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