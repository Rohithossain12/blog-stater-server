import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";

const login = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User Not Found")
    }

    if (password === user.password) {
        return user
    } else {
        throw new Error("Password doesn't match")
    }

}


const loginWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) {
        user = await prisma.user.create({
            data
        })
    }
    return user
}





export const AuthService = {
    login,
    loginWithGoogle
}