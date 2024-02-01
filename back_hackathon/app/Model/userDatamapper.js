const userService = require('../Services/userService');
const {prisma} = require('../mysql_client');
const jwt = require('jsonwebtoken');

const userDataMapper = {
  async getUsers(){
    try {
      return prisma.user.findMany({
        include: {
          skillTree: true,
          task: true
        }
      })
    }catch(error){
      return {error: err, results: null}
    }
  },
  async signIn({email, password}) {
    try {
  
      const user = await prisma.user.findUnique({
        where: { email },
      });
    
      if (!user || !await userService.passwordCompare(password, user.password)) {
        throw new Error('Invalid email or password');
      }
    
      const token = jwt.sign({ userId: user.userID, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;

    } catch (err) {
      // Renvoyer l'erreur pour la gestion ultérieure
      throw err
    }
  },

  async signUp(user) {
    
    try {

      const role = userService.determineRole(user.role)

      const result = await prisma.user.create({
        data: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: role,
          password: user.password,
        }
      })

      return result;
    } catch (err) {
      console.error("Error in userRepository.signUp:", err);
      throw err; 
    }
  },
};

// module.exports = userDataMapper;