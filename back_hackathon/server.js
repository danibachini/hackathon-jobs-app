require('dotenv').config();
const con = require('./app/mysql_client');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();


// ------ Mise en place de sécurité -> pentest 06/10 ------

// Middleware pour supprimer l'en-tête "X-Powered-By" // 1 & 2
app.disable('x-powered-by');

// Empêche le chargement de la page dans un iframe // 3
app.use((req, res, next) => {
    res.header('X-Frame-Options', 'SAMEORIGIN'); 
    next();
});

// Configurez CORS pour autoriser uniquement certaines origines // 4 & 8
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Remplacez par l'URL de votre front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // envoi de "No Content" pour minimiser l'echange de donné
 };

// Ajoute l'en-tête 'X-Content-Type-Options: nosniff' à toutes les réponses. // 5
app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Content-Security-Policy', "default-src 'self'"); 
    next();
});



// ------ Mise en place de sécurité -> pentest 06/10 ------
app.use(cors(corsOptions));


const router = require('./app/router');
app.use(express.json());




// Mise en place du router (gestion des dossiers public/private et des routes)
app.use(router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT} …`);
});

module.exports = con;