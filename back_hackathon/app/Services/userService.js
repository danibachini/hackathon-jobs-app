const bcrypt = require("bcrypt")
const {prisma} = require("../mysql_client")

module.exports = {
    async passwordHasher(password){
        return await bcrypt.hash(password, parseInt(process.env.SALT))
    },

    async passwordCompare(password, passwordToCompare){
        return await bcrypt.compare(password, passwordToCompare)
    },

    determineRole(userType) {
        switch (userType) {
          case 'candidate':
            return 'CANDIDATE';
          case 'admin':
            return 'ADMIN';
          case 'recruiter':
            return 'RECRUITER';
          default:
            throw new Error('Invalid user type');
        }
    }
}