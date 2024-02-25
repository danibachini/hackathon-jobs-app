import { Response } from "express"
import userDatamapper from "../Model/userDatamapper"
import {getUserByEmail} from "../Services/userService"
import {SignInRequestType, SignUpRequestType} from "../types"

const userController = {
  async signUp(req: SignUpRequestType, res: Response) {
    try {
      const newUser = req.body;
      const existingUser = await getUserByEmail(newUser.email)
  
      if (existingUser) {
        return res.status(400).json({ message: "A user with this email already exists!" });
      }
  
      const userCreated = await userDatamapper.signUp(newUser);
      const {lastname, firstname, role, userID, email} = userCreated
      
      return res.status(201).json({ message: "User created successfully.", user: {lastname, firstname, role, userID, email} });
    } catch (err) {
      console.error("Error in userController.signUp:", err);
      res.status(500).json({ message: "Internal server error" });
    }

    
  },
  signIn: async (req: SignInRequestType, res: Response) => {
    const { email, password } = req.body;

    try {
      const token = await userDatamapper.signIn({email, password});
      res.json({ message: 'Logged in successfully', token });
    } catch (error : any) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },
    
  };
 export default userController;