import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { createUser, getUserByEmail } from "../../app/Services/userService"
import { Role } from "@prisma/client"

vi.mock("../../libs/prisma")

describe("Unit tests", ()=>{
    let user:any;

    it("should create a user", async ()=>{
        const mockUser = {
            firstname: "Adam", 
            lastname: "Silver", 
            email: "adam@prisma.com", 
            password: "hashedpass", 
            role: Role.CANDIDATE
        }
        prisma.user.create.mockResolvedValue({...mockUser, userID: 1})
        user = await createUser(mockUser)
        expect(user).toStrictEqual({...mockUser, userID: 1})
    })

    it("should find the user by its email", async () => {
        prisma.user.findUnique.mockResolvedValue(user)
        const userExist = await getUserByEmail(user.email)
        expect(userExist).not.toBe(null)
        expect(userExist).toEqual(user)
    })

})
