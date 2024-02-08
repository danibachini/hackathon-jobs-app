import prisma from '../../libs/__mocks__/prisma';
import bcrypt from "../../__mocks__/bcrypt"
import { vi, describe, expect, it , beforeEach} from 'vitest';
import userDataMapper from '../../app/Model/userDatamapper';
import { Role } from '@prisma/client';

vi.mock("bcrypt")
vi.mock("../../prisma/prisma.js")

describe("sign in function", () => {

    it("should signup a new user", async ()=>{
        const mockUser = {
            email: 'camille@test.com',
            password: 'hashedpassword123',
            role: Role.CANDIDATE,
            firstname: "Camille",
            lastname: "Paul"
        };

        prisma.user.create.mockResolvedValue({...mockUser, userID: 1})

        const user = await userDataMapper.signUp(mockUser)
        expect(user).toStrictEqual({...mockUser, userID: 1})
    })
});