import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { createUser } from "../../app/Services/userService"
import { Role } from "@prisma/client"

vi.mock("../../libs/prisma")

describe("Unit tests", ()=>{
    it("should create a user", async ()=>{
        const mockUser = {
            firstname: "Adam", 
            lastname: "Silver", 
            email: "adam@prisma.com", 
            password: "hashedpass", 
            role: Role.CANDIDATE
        }
        prisma.user.create.mockResolvedValue({...mockUser, userID: 1})
        const user = await createUser(mockUser)
        expect(user).toStrictEqual({...mockUser, userID: 1})
    })
})
