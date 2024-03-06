import {Router} from 'express'
import {validationService} from './Security_module/validationService';
import userController from './Controller/userController';

export const router = Router()

router.post("/signup", validationService.checkSignUpData, userController.signUp); 
router.post("/signin", validationService.checkLoginData, userController.signIn); 
