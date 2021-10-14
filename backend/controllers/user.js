// La gestion des utilisateurs
const bcrypt = require("bcrypt"); // module de cryptage SHA1 pour password
const jwt = require("jsonwebtoken"); // module d'authentification par token
const db = require("../models"); // bdd definition
const User = db.users;

// POST pour signup d'un nouvel utilisateur
// ========================================
exports.signup = (req, res, next) => {
	console.log("signup");

	bcrypt
		.hash(req.body.password, 10) // password hashé
		.then((hash) => {
			const user = new User({
				name: req.body.username,
				email: req.body.email,
				password: hash,
			});
			user
				.save() // Tentative de sauvegarde en base

				// Sauvegarde OK
				.then((user) => {
					if (user) {
						res.status(201).json({ message: "User created !" });
					}
				})

				// Erreur 400 Bad Request: Erreur de validation si user existe
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// POST pour login d'un utilisateur
// ================================
exports.login = (req, res, next) => {
	console.log("login");

	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				// l'utilisateur n'existe pas
				return res.status(404).json({ message: "Invalid credential !" });
			}
			bcrypt // L'utilisateur existe, on vérifie que le password est le bon
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						// l'utilisateur existe mais le password ne correspond pas
						return res.status(401).json({ message: "Invalid credential !" });
					}
					res.status(200).json({
						// l'utilisateur existe et le password est le bon
						userId: user.id,
						isAdmin: user.isAdmin,
						email: user.email,
						name: user.name,
						token: jwt.sign({ userId: user.id }, process.env.TOKEN, { expiresIn: "24h" }),
					});
				}) // Erreur bcrypt.compare
				.catch((error) => res.status(500).json({ error }));
		}) // Erreur findOne
		.catch((error) => res.status(500).json({ error }));
};

// GET info un User
// ================
exports.getUser = (req, res, next) => {
	console.log("getUser");

	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => res.status(404).json({ error }));
};

// GET info All Users
// ==================
exports.getAllUsers = (req, res, next) => {
	User.findAll()
		.then((AllUserdata) => {
			res.status(200).json({ AllUserdata });
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

// DELETE My Account
// =================
exports.deleteMyAccount = (req, res, next) => {
	console.log("deleteMyAccount");
	console.log(req.user);

	User.destroy({ where: { id: req.user } })
		.then(() => res.status(200).json({ message: "user with Id=" + req.user + " deleted" }))
		.catch((error) => {
			console.log(error);
			res.status(401).json({ message: "delete failed !" });
		});
};

// DELETE one User
// ===============
exports.deleteUser = (req, res, next) => {
	console.log("deleteUser");

	const paramId = parseInt(req.params.id);

	User.findOne({ where: { id: req.user } })
		.then((user) => {
			if (user.isAdmin || user.id == paramId) {
				// le demandeur est Admin ou le demandeur se supprime lui-même
				User.destroy({ where: { id: paramId } })
					.then(() => res.status(200).json({ message: "user with Id=" + paramId + " deleted" }))
					.catch(() => {
						res.status(401).json({ message: "delete failed !" });
					});
			}
			// le demandeur n'est pas admin ou veut se supprimer
			else res.status(401).json({ message: "Unauthorized request !" });
		})
		.catch((error) => res.status(404).json({ error }));
};

// Admin User
// ==========
exports.adminUser = (req, res, next) => {
	console.log("adminUser");

	const paramId = parseInt(req.params.id);

	User.findOne({ where: { id: req.user } })
		.then((user) => {
			if (user.isAdmin && user.id != paramId) {
				// le demandeur est Admin et différent du user à supprimer, on update
				User.update({ isAdmin: req.body.isadmin }, { where: { id: paramId } })
					.then(() => res.status(200).json({ message: "User with Id=" + paramId + " updated" }))
					.catch(() => {
						res.status(401).json({ message: "Update failed !" });
					});
			}
			// le demandeur n'est pas admin
			else res.status(401).json({ message: "Unauthorized request !" });
		})
		.catch((error) => res.status(404).json({ error }));
};
