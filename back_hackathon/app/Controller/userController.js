
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDatamapper = require("../Model/userDatamapper");
const {prisma} = require("../mysql_client")
const userService = require("../Services/userService")


const userController = {
  async signUp(req, res, next) {
    try {
      const newUser = req.body;
      const existingUser = await prisma.user.findUnique({
        where: {
          email: newUser.email,
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "A user with this email already exists!" });
      }
  
      const hashedPassword = await userService.passwordHasher(newUser.password);
      newUser.password = hashedPassword;
  
      const userCreated = await userDatamapper.signUp(newUser);
      return res.status(201).json({ message: "User created successfully.", user: userCreated });
    } catch (err) {
      console.error("Error in userController.signUp:", err);
      res.status(500).json({ message: "Internal server error" });
    }

  },
  signIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await userDatamapper.signIn({email, password});
      res.json({ message: 'Logged in successfully', token });
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },
    async getAllUsers(req, res, next){
      try {
        const users = await userDatamapper.getUsers()
        res.status(200).send(users)
      }
      catch(err){
        res.send(500).send({"error": err})
      }
    },
    checkToken(req,res,next){
      try{
        const token = req.headers.authorization.split(" ")[1];
        // Extraction du token d'authentification de la requête (req.headers.authorization)
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // Verification du token en utilisant le JWT_SECRET
        if (decoded) {
          // Si le token est valide, renvoie un objet JSON indiquant que le token est valide
          return res.json({ message: "Utilisateur re connecté avec succès.", token, first_name:decoded.name, id:decoded.id });
        }
        next();
      }
      catch(error){
        return res.status(403);
      }
    }
  };
  module.exports = userController;