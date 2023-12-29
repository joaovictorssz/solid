import { describe, it } from "vitest";
import { AuthenticationService } from "./authentication-service";
import { InMemoryUserRegisterRepository } from "@/repositories/in-memoryuser-registration";
import { hash } from "bcryptjs";
import { expect } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentia-error";

describe("Authentication Use Case", () => {

    it('should be able to authenticate', async () => {
        const inMemoryRepository = new InMemoryUserRegisterRepository()
        const sut = new AuthenticationService(inMemoryRepository)

        await inMemoryRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password_hash: await hash("123456", 6)
        })

        const user = await sut.authenticate({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should not be able to authenticate with incorrect email', async () => {
        const sut = new AuthenticationService(new InMemoryUserRegisterRepository())


        await expect(async () => {
            await sut.authenticate({ email: "johndoe@example.com", password: "123456" })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)


    })

    it('should not be able to authenticate with incorrect password', async () => {
        const inMemoryRepository = new InMemoryUserRegisterRepository()
        const sut = new AuthenticationService(inMemoryRepository)

        await inMemoryRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password_hash: await hash("123456", 6)
        })

        await expect(async () => {
            await sut.authenticate({ email: "johndoe@example.com", password: "123123" })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})