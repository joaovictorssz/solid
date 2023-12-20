import { PrismaUsersReposirory } from "@/repositories/prisma-user-repository"
import { hash } from "bcryptjs"

interface CreateUserServiceParams{
    name: string,
    email: string,
    password: string
}

export async function createUserService({email, name, password}:CreateUserServiceParams){


    const password_hash = await hash(password, 6)

    // Instancia a classe criada nos  repositórios
    const prismaUsersReposirory = new PrismaUsersReposirory()

    await prismaUsersReposirory.create({email, name, password_hash})
}