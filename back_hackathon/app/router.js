const router = require('express').Router();
const validationService = require('./Security_module/validationService');
const userController = require('./Controller/userController');


router.post("/signup", validationService.checkSignUpData, userController.signUp); 
router.post("/signin", validationService.checkLoginData, userController.signIn); 
//router.get("/checkToken",userController.checkToken);

module.exports = router;