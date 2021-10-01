// in controllers/user.js
const bcrypt = require("bcrypt"); // module de cryptage SHA1 pour password
const jwt = require("jsonwebtoken"); // module d'authentification par token
const database = require("../config");

// POST pour signup d'un nouvel utilisateur
// ========================================
exports.signup = (req, res, next) => {
	const user = req.body;
	console.log("signup");

	bcrypt.hash(user.password, 10).then((hash) => {
		// Enregistrement des données de l'utilisateur
		user.password = hash;
		user.isadmin = 0;

		database.query('SELECT * from users WHERE name="' + user.name + '" OR email="' + user.email + '"', (err, result) => {
			// On vérifie si le name ou l'email existent déjà
			if (err) throw err;

			if (result.length >= 1) {
				// si oui, on abandonne
				return res.status(400).json({ message: "User already exists !" });
			} else {
				// Si non, on enregistre
				database.query("INSERT INTO users SET ?", user, (error, result) => {
					if (error) throw error;
					return res.status(201).json({ message: "User created !" });
				});
			}
		});
	});
};

// POST pour login d'un utilisateur
// ================================
exports.login = (req, res, next) => {
	const user = req.body;

	console.log("login");
	database.query('SELECT password, id FROM users WHERE email="' + user.email + '"', (err, result) => {
		if (!err) {
			if (!result) {
				// le user n'exite pas dans la base
				return res.status(401).json({ message: "User not found !" });
			} else {
				// le user existe, verifions le password
				console.log(user.password);
				console.log(result[0].password);

				bcrypt
					.compare(user.password, result[0].password)

					.then((valid) => {
						if (!valid) {
							// l'utilisateur existe mais le password ne correspond pas
							return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas" });
						}
						res.status(200).json({
							// l'utilisateur existe et le password est le bon
							token: jwt.sign({ userId: result[0].id }, process.env.TOKEN, { expiresIn: "24h" }),
							userId: result[0].id,
						});
					})
					// Erreur de comparaison bcrypt.compare
					.catch((error) => res.status(500).json({ error }));
			}
		} else {
			throw err;
		}
	});
};

// GET info un User
// ================
exports.getUser = (req, res, next) => {
	console.log("getUser");

	database.query('SELECT * FROM users WHERE id="' + req.params.id + '"', (err, result) => {
		if (err) throw err;
		console.log(result);
		return res.status(200).json(result);
	});
};

// GET info All Users
// ==================
exports.getAllUsers = (req, res, next) => {
	console.log("getAllUsers");

	database.query("SELECT * FROM users", (err, result) => {
		if (err) throw err;
		console.log(result);
		return res.status(200).json(result);
	});
};
