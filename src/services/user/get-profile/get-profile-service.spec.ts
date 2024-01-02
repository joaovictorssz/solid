import { InMemoryUserRegisterRepository } from "@/repositories/in-memory/in-memory-user-registration";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-profile-service";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

let userRepository : InMemoryUserRegisterRepository
let sut : GetUserProfileService

const userFake = {
    name: "John Doe",
    email: "johndoe@example.com",
    password_hash: "123456"
}

describe('Get User Profile Service', () => {

    beforeEach(()=>{
        userRepository = new InMemoryUserRegisterRepository()
        sut = new GetUserProfileService(userRepository)
    })

    it('Should be able to get user profile by id', async () => {
        const created_user = await userRepository.create(userFake)

        const user = await sut.get(created_user.id)
        expect(user.name).toBe('John Doe')

    })

    it('Should not be able to get user profile with wrong id',async () => {
        
        
        await userRepository.create(userFake)
        
        await expect(async ()=>{
            await sut.get('abcdef')
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})