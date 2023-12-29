import { describe, expect, it } from "vitest";
import { CreateUserServices } from "./register-service";
import { InMemoryUserRegisterRepository } from "@/repositories/in-memoryuser-registration";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";


describe("Registration test suits", ()=>{

    const userFake = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456"
    }
   
    
    it("should hash user password upon registration", async ()=>{
        
        const userService = new CreateUserServices(new InMemoryUserRegisterRepository())
        const {user} = await userService.create(userFake)

        const isPasswordHashed  = await compare(userFake.password, user.password_hash)

        expect(isPasswordHashed).toBe(true)

    })

    it("should not be able to register user with same email twice", async () => {
        
        const userService = new CreateUserServices(new InMemoryUserRegisterRepository())
        await userService.create(userFake)

        await expect( async ()=>{
            
            await userService.create(userFake)
        
        }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
        

    })

    it("should be able to register a new user", async () => {
        const userService = new CreateUserServices(new InMemoryUserRegisterRepository())

        const { user } = await userService.create(userFake)

        expect(user.id).toStrictEqual(expect.any(String))
    })

})