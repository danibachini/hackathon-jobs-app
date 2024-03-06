import prisma from '../../libs/prisma'
import { afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../server';

async function cleanDb() {
    await prisma.user.deleteMany({});
}

afterAll(async () => {
    await cleanDb()
})

describe('Db connection', () => {

    it('should establish connection to the db', () => {
        const users = prisma.user.findMany();
        expect(users).not.toBe(null);
    });

    it('should respond with a `201` status code and user details', async () => {
        const { status, body } = await request(app)
            .post('/signup')
            .send({
                email: 'camille@test.com',
                password: 'hashedpassword123',
                role: "admin",
                firstname: "Camille",
                lastname: "Paul"
            })
        const newUser = await prisma.user.findFirst();
        expect(status).toBe(201)
        expect(newUser).not.toBe(null)
        expect(body.message).toEqual('User created successfully.')
    });

    it('should sign in the user and respond with a message and a token', async () => {
        const { body } = await request(app)
            .post('/signin')
            .send({
                email: 'camille@test.com',
                password: 'hashedpassword123',
            })
        expect(body.token).not.toBe(null)
        expect(body.message).toEqual('Logged in successfully')
    })
});
