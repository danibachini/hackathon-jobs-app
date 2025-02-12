import Joi from 'joi';
// Importation du module Joi, qui est utilisé pour la validation des données
import jwt from 'jsonwebtoken';
// Importation du module jwt pour gérer les jetons JSON Web Token
import {Request, Response, NextFunction} from "express"



const schemaUserInput = Joi.object({
    // Définition du schéma de validation pour les données d'inscription
    email: Joi.string().email().required(),
    // Champ "email" doit être une chaîne de caractères au format email et est requis
    lastname: Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{2,14}$')),
    firstname: Joi.string().required(),
    role: Joi.string().valid('candidate', 'recruiter', 'admin').required(),
    // Champ "name" doit suivre un certain modèle (regex)
    password: Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{6,18}$')),
    // Champ "password" doit suivre un certain modèle (regex)
});

const schemaUserLogin = Joi.object({
    email: Joi.string().email().required(),
    // Champ "email" doit être une chaîne de caractères au format email et est requis
    password: Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{6,18}$')).required()
    // Champ "password" doit suivre un certain modèle (regex) et est requis
});

export const validationService = {
    checkSignUpData(req: Request, res: Response, next: NextFunction) {
        let { error } = schemaUserInput.validate(req.body);
        // Validation des données d'inscription
        if (!error) {
            next();
            // Si aucune erreur de validation, passez à la fonction suivante
        } else {
            let err = new Error(error.details[0].message);
            // Créez une erreur avec le message de la première erreur de validation
            next(err);
            // Passez l'erreur à la fonction de gestion des erreurs
        }
    },
    checkLoginData(req: Request, res: Response, next: NextFunction) {
        let { error } = schemaUserLogin.validate(req.body);
        // Validation des données de connexion
        if (!error) {
            next();
            // Si aucune erreur de validation, passez à la fonction suivante dans la chaîne middleware
        } else {
            let err = new Error(error.details[0].message);
            // Créez une erreur avec le message de la première erreur de validation
            next(err);
            // Passez l'erreur à la fonction de gestion des erreurs
        }
    },
    checkToken(req: Request, res: Response, next: NextFunction){
        try{
          const token = req.headers.authorization?.split(" ")[1];
          // Extraction du token d'authentification de la requête (req.headers.authorization)
          const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
          // Verification du token en utilisant le JWT_SECRET
          if (decoded) {
            // Si le token est valide, renvoie un objet JSON indiquant que le token est valide
            return res.json({ message: "Utilisateur re connecté avec succès.", token,});
          }
          next();
        }
        catch(error){
          return res.status(403);
        }
      }
};