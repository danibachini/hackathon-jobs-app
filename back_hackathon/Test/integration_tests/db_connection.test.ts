import prisma from '../../libs/prisma'
import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../server';
import { Role } from '@prisma/client';

describe('Db connection', () => {
    // beforeEach(async() => {
    //     prisma.user.deleteMany

    // })
    it('should establish connection to the db', () => {
        const users = prisma.user.findMany();
        expect(users).not.toBe(null);
    });

    it('should respond with a `200` status code and user details', async () => {
        const { status, body } = await request(app)
            .post('/signup')
            .send({
                email: 'camille@test.com',
                password: 'hashedpassword123',
                role: "candidate",
                firstname: "Camille",
                lastname: "Paul"
            })
        const newUser = await prisma.user.findFirst();
        expect(status).toBe(201)
        expect(newUser).not.toBe(null)
        expect(body.user).toStrictEqual({
            role: Role.CANDIDATE,
            firstname: "Camille",
            lastname: "Paul",
            id: newUser?.userID
        })
    });


});










// import prisma from '../../libs/__mocks__/prisma';
// import bcrypt from "../../__mocks__/bcrypt"
// import { vi, describe, expect, it , beforeEach} from 'vitest';
// import userDataMapper from '../../app/Model/userDatamapper';
// import { Role } from '@prisma/client';

// vi.mock("bcrypt")
// vi.mock("../../libs/prisma.js")

// describe("sign in function", () => {

//     it("should signup a new user", async ()=>{
//         const mockUser = {
//             email: 'camille@test.com',
//             password: 'hashedpassword123',
//             role: Role.CANDIDATE,
//             firstname: "Camille",
//             lastname: "Paul"
//         };

//         prisma.user.create.mockResolvedValue({...mockUser, userID: 1})

//         const user = await userDataMapper.signUp(mockUser)
//         expect(user).toStrictEqual({...mockUser, userID: 1})
//     })
// });