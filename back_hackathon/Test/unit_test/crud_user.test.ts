import { describe, expect, it, vi } from "vitest"
import prisma from "../../libs/__mocks__/prisma"
import { 
    createUser, 
    getUserByEmail, 
    updateUser, 
    deleteUser
} from "../../app/Services/userService"
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
        expect(userExist). not.toBe(null)
        expect(userExist).toEqual(user)
    })

    it("should update the user email", async () => {
        const newUserEmail = { email: "a.silver@prisma.com" }
        const userDataUpdated = { ...user, ...newUserEmail }
        prisma.user.update.mockResolvedValue(userDataUpdated)
        const dataUpdatedFromDb = await updateUser(userDataUpdated, user.userID)
        expect(dataUpdatedFromDb).toEqual(userDataUpdated)
    })

    it("should find the user by its ID and delete it", async () => {
        prisma.user.delete.mockResolvedValue(user)
        const deletedUserFromDb = await deleteUser(user.userID)
        expect(deletedUserFromDb).toEqual(user)
    })
})
