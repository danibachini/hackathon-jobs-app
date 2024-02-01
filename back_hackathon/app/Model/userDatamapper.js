
const prisma = require("../mysql_client").prisma;

async function main() {
  console.log('inside main');
  // console.log('prisma.user is: ', prisma.user);
  try {
    const users = await prisma.user.findMany();
    console.log('Retrieved users:', users);
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
}

main()

  // .finally(async () => {
  //   await prisma.$disconnect();
  // });

// const userDataMapper = {
//   async signIn(loginInformations) {
//     try {
//       const sqlQuery = 'SELECT * FROM validate_login($1)';
//       const values = [loginInformations];
//       const response = await con.query(sqlQuery, values);
//       const result = response.rows[0].validate_login;

//       console.log("loginInformations : linfo est" );

//       console.log(values); 
//       console.log(response);

//       console.log(result, 'contenu de mon entrant');  

//       if (!result) {
//         throw new Error('Erreur de validation du login');
//       }

//       return { error: null, result };
//     } catch (err) {
//       // Renvoyer l'erreur pour la gestion ultérieure
//       return { error: err, result: null };
//     }
//   },

//   async signUp(user) {
//     console.log(prisma)
//     try {
//       const sqlQuery = `SELECT * FROM users WHERE email='${user.email}'`;
//       const values = [user];

//       const response = con.query(sqlQuery, values,  function (error, results, fields) {
//        if(error) throw error;
//         return results
//       });
      
//       console.log(response)
//       if (response) {
//         throw new Error('Erreur lors de l\'insertion des personnes');
//       }

//       const sqlInsertQuery = `INSERT INTO users (first_name, last_name, email, password, profile) VALUES(?, ?, ?, ?, ?)`
//       const insertResponse = con.query(sqlInsertQuery, [user])

//       return { error: null, insertResponse };
//     } catch (err) {
//       // Renvoyer l'erreur pour la gestion ultérieure
//       return { error: err, result: null };
//     }
//   },
// };

// module.exports = userDataMapper;