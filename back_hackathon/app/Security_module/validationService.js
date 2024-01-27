const Joi = require('joi');
// Importation du module Joi, qui est utilisé pour la validation des données
const jwt = require('jsonwebtoken');
// Importation du module jwt pour gérer les jetons JSON Web Token



const schemaUserInput = Joi.object({
    // Définition du schéma de validation pour les données d'inscription
    email: Joi.string().email().required(),
    // Champ "email" doit être une chaîne de caractères au format email et est requis
    last_name: Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{2,14}$')),
    first_name: Joi.string().required(),
    profile: Joi.string().valid('candidate', 'company', 'admin').required(),
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

module.exports = {
    checkSignUpData(req, res, next) {
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
    checkLoginData(req, res, next) {
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
    checkToken(req,res,next){
        try{
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token,process.env.JWT_SECRET);
            next();
        }
        catch(error){
            next(error);
        }
    }
};