import { prisma } from '../../app/prisma_client';
import { vi, describe, expect, it } from 'vitest';
import userDataMapper from '../../app/Model/userDatamapper';
import userService from '../../app/Services/userService';

prisma.user.findUnique = vi.fn();

// const userService = {
//     passwordCompare: () => {}, 
// };

// this line is mocking the module, it tells vitest to replace the actual implementation of userService with a mock version during testing - reference: https://www.prisma.io/blog/testing-series-2-xPhjjmIEsM#mock-any-modules-used-by-the-target-file
vi.mock('../../app/Services/userService', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        default: {
            ...actual,
            passwordCompare: () => {}, 
        }
    };
});


// vi.mock('../../app/prisma_client', async (importOriginal) => {
//     const actual = await importOriginal();
//     return {
//         ...actual,
//         user: {
//             findUnique: vi.fn().mockResolvedValue(mockUser),
//         }
//     };
// });
            
            
// vi.mock('../../app/Services/userService', () => userService);
// vi.mock('../userService', () => userService);
            
            
describe("sign in function", () => {
    it("should sign in the user with valid credentials", async () => {
        const mockUser = {
            userID: 1,
            email: 'usermock@test.com',
            password: 'hashedPassword',
            role: 'candidate',
        };
                    
        // const mockUser = {
        //     userID: 1,
        //     email: 'claire@test.com',
        //     password: 'hashedpassword123',
        //     role: 'candidate',
        // };

        // prisma.user.findUnique.mockResolvedValueOnce(mockUser);
        // console.log('this is mock: ', mockUser);
        // await Promise.resolve(prisma.user.findUnique.mockResolvedValueOnce(mockUser));
        const bla = await Promise.resolve(prisma.user.findUnique.mockResolvedValueOnce(mockUser));
        console.log('BLA: ', bla);

        console.log('MOCK CALLS ARE: ', prisma.user.findUnique.mock.calls);
        console.log('MOCK RESULTS ARE: ', prisma.user.findUnique.mock.results);

        // userService.passwordCompare.mockResolvedValueOnce(true);
        userService.passwordCompare = vi.fn().mockResolvedValueOnce(true);

        const token = await userDataMapper.signIn({ email: mockUser.email, password: mockUser.password });

        expect(token).not.toBe(null);
    });
});



