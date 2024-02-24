import {createUser, getUserByEmail, getAllUsers} from '../Services/userService';
import prisma from '../../libs/prisma';
import jwt from 'jsonwebtoken';
import {User} from "../types"
import {Prisma} from "@prisma/client"
import { passwordCompare, passwordHasher, determineRole } from '../utils/utils';

const userDataMapper = {

  async getAllUsers(){
    console.log(Prisma.UserScalarFieldEnum)
    try {
      return await getAllUsers()
    }catch(error){
      return {error: error, results: null}
    }
  },

  async signIn({email, password}: {email: string, password: string}) {
    try {
  
      const user = await getUserByEmail(email)
    
      if (!user || !await passwordCompare(password, user.password)) {
        throw new Error('Invalid email or password');
      }
    
      const token = jwt.sign({ userId: user.userID, email: user.email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      return token;

    } catch (err) {
      // Renvoyer l'erreur pour la gestion ultérieure
      throw err
    }
  },

  async signUp(user : User) {

    try {

      const hashedPassword = await passwordHasher(user?.password);
      user.password = hashedPassword;
      
      const role = determineRole(user.role)

      const result = await createUser({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: role,
        password: user.password,
      })

      return result;
    } catch (err) {
      console.error("Error in userDataMapper.signUp:", err);
      throw err; 
    }
  },
};

export default userDataMapper;