import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserServices } from "./register-service";
import { InMemoryUserRegisterRepository } from "@/repositories/in-memory/in-memory-user-registration";
import { compare } from "bcryptjs";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";


let usersRepository: InMemoryUserRegisterRepository
let sut: CreateUserServices

describe("Registration test suits", ()=>{

    beforeEach(() => {
        usersRepository = new InMemoryUserRegisterRepository()
        sut = new CreateUserServices(usersRepository)
    })

    const userFake = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456"
    }
    
    it("should hash user password upon registration", async ()=>{
        
       const { user } = await sut.create(userFake)

        const isPasswordHashed  = await compare(userFake.password, user.password_hash)

        expect(isPasswordHashed).toBe(true)

    })

    it("should not be able to register user with same email twice", async () => {
        
        await sut.create(userFake)


        await expect( async ()=>{
            
            await sut.create(userFake)
        
        }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
        

    })

    it("should be able to register a new user", async () => {

        const { user } = await sut.create(userFake)

        expect(user.id).toStrictEqual(expect.any(String))
    })

})