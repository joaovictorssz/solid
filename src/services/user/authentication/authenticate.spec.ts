import { beforeEach, describe, it } from "vitest";
import { AuthenticationService } from "./authentication-service";
import { InMemoryUserRegisterRepository } from "@/repositories/in-memory/in-memory-user-registration";
import { hash } from "bcryptjs";
import { expect } from "vitest";
import { InvalidCredentialsError } from "../../errors/invalid-credentia-error";


let usersRepository: InMemoryUserRegisterRepository
let sut: AuthenticationService

describe("Authentication Use Case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRegisterRepository()
        sut = new AuthenticationService(usersRepository)
    })

    it('should be able to authenticate', async () => {

        await usersRepository.create({
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

        await expect(async () => {
            await sut.authenticate({ email: "johndoe@example.com", password: "123456" })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)


    })

    it('should not be able to authenticate with incorrect password', async () => {

        await usersRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password_hash: await hash("123456", 6)
        })

        await expect(async () => {
            await sut.authenticate({ email: "johndoe@example.com", password: "123123" })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})