require('dotenv').config();
const mysql = require('mysql');

console.log('THE KEY IS: ', process.env.DB_KEY);

const con = mysql.createConnection({
    host: "mysql-hackathon.alt-tools.tech",
    port: 3306,
    user: "cgi",
    password: process.env.DB_KEY,
    database: "cgi_db"
  });
  
con.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
    console.log("Connected!");
});

module.exports=con;