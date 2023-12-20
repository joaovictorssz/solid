import { PrismaUserRepositoryInterface } from "@/repositories/interfaces/prisma-user-repository"
import { hash } from "bcryptjs"

interface CreateUserServiceParams {
    name: string,
    email: string,
    password: string
}

export class CreateUserService {

    constructor(private usersRepository: PrismaUserRepositoryInterface) { }

    async create({ email, name, password }: CreateUserServiceParams) {


        const password_hash = await hash(password, 6)
        console.log(password_hash)

        const user = await this.usersRepository.create({
            email, name, password_hash
        })

        return user

    }

}

