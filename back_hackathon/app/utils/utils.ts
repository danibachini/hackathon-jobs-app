import bcrypt from "bcrypt"
import { Role } from "@prisma/client"

export const passwordHasher = async(password: string) => {
    return await bcrypt.hash(password, parseInt(process.env.SALT as string))
}
export const passwordCompare = async (password: string, passwordToCompare: string) =>{
    return await bcrypt.compare(password, passwordToCompare)
}

export const determineRole = (userType: string) => {
    switch (userType) {
        case 'candidate':
            return Role.CANDIDATE;
        case 'admin':
            return Role.ADMIN;
        case 'recruiter':
            return Role.RECRUITER;
        default:
            throw new Error('Invalid user type');
    }
}