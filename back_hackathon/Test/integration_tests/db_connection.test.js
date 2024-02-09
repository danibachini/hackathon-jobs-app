import { prisma } from '../../app/prisma_client';
import { describe, expect, it } from 'vitest';

describe('Db connection', () => {
    it('should establish connection to the db', () => {
        const users = prisma.user.findMany();
        expect(users).not.toBe(null);
    });
});
