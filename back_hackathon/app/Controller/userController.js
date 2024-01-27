
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDatamapper = require("../Model/userDatamapper");


const userController = {
  async signUp(req, res, next) {
    const newUser = req.body;
    // Récupération des données de la nouvelle personne à partir de la requête (req.body)
    const existingUser = await userDatamapper.signUp(newUser);

    if (existingUser.result) {
      return res.status(400).json({ message: "Ce mail existe déjà, veuillez en choisir un autre." });
      // Retourne un objet JSON avec la propriété "message" contenant le message d'erreur
    } else {
      try {
        const hashedPassword = await bcrypt.hash(newUser.password, parseInt(process.env.SALT));
        // Chiffrement du mot de passe de la nouvelle personne en utilisant bcrypt
        newUser.password = hashedPassword;
        // Remplacement du mot de passe non chiffré par le mot de passe chiffré dans les données de la nouvelle personne
        const usercreated = await userDatamapper.signUp(newUser);
        // Appel de la fonction signUp du userDataMapper pour ajouter la nouvelle personne en base de données
        return res.status(200).json({ message: "Utilisateur créé avec succès.", user: usercreated });
        // Retourne un objet JSON avec la propriété "message" indiquant que l'utilisateur a été créé avec succès
      } catch (error) {
        return res.status(500);
        // Retourne un objet JSON avec la propriété "message" indiquant une erreur lors de la création de l'utilisateur
      }
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { password, mail } = req.body;
      // Extraction des données password et email de la requête (req.body)
      const { error, result } = await userDatamapper.getUserByEmail({ mail: mail });

      consol.log(password, mail , 'contenu de mon entrant');  
          // Appel de la fonction getPersonsByEmail du userDataMapper pour récupérer la personne correspondant à l'email fourni
      if (error) {
        next(error);
      } else {
        if (!result) {
          return res.json('couple mail mdp incorrect');
          // Retourne un objet JSON indiquant que le couple email/mot de passe est incorrect
        }
        const userName = result.name;
        const id = result.id;
        const passwordCorrect = await bcrypt.compare(password, result.password);
        // Comparaison du mot de passe fourni avec le mot de passe en base de données
        if (!passwordCorrect) {
          return res.json('couple mail mdp incorrect');
          // Retourne un objet JSON indiquant que le couple email/mot de passe est incorrect
        };

        const token = jwt.sign({ mail: mail, first_name:userName, id:id }, process.env.JWT_SECRET);
        // Création d'un token JWT avec les données souhaitées
        return res.json({ message: "Utilisateur connecté avec succès.", token, first_name, id, mail });
        // Retourne un objet JSON avec la propriété "message" indiquant que l'utilisateur s'est connecté avec succès et le token
      }}catch(error){
        return res.status(500);
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