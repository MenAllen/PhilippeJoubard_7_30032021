var mysql = require("mysql2");

// Connexion à MYSQL
var database = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Kerguelen08;",
	database: "groupomania",
});

module.exports = database;
