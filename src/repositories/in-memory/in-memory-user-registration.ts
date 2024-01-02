import { Prisma, User } from "@prisma/client";
import { PrismaUserRepository } from "../prisma-user-repository";

export class InMemoryUserRegisterRepository implements PrismaUserRepository {

    public items: User[] = []

    async getUserProfile(id: string): Promise<User | null> {
        const user = this.items.find((item)=> item.id === id)

        if(!user){
            return null
        }
        
        return user
    }

    async verifyExistantEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }
    async create(data: Prisma.UserCreateInput) {

        const user = {
            createdAt: new Date(),
            email: data.email,
            id: JSON.stringify(this.items.length + 1),
            name: data.name,
            password_hash: data.password_hash
        }
        this.items.push(user)

        return user

    }
}