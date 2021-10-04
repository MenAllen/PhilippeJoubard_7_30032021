// La gestion des messages
const db = require("../models");
const Message = db.messages;
const User = db.users;
const Comment = db.comments;

// POST Create Message
// ===================
exports.createMessage = (req, res, next) => {
	console.log("createMessage");

	console.log(req.user);

	let picture = "";
	if (req.file) {
		picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
	}
	const message = new Message({
		UserId: req.user,
		message: req.body.message,
		imageUrl: picture,
	});

	message
		.save()
		.then(() => res.status(201).json({ message: "Message posted" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET all messages
// ================
exports.getAllMessages = (req, res, next) => {
	console.log("getAllMessages");

	Message.findAll()
		.then((messages) => {
			res.status(200).json({ messages });
		})
		.catch((error) => res.status(400).json({ error }));
};

// GET one message
// ================
exports.getMessage = (req, res, next) => {
	console.log("getMessage");

	Message.findOne({ where: { id: req.params.id } })
		.then((message) => {
			res.status(200).json(message);
		})
		.catch((error) => res.status(404).json({ error }));
};

// GET all messages for one user
// =============================
exports.getAllMessagesForOne = (req, res, next) => {
	console.log("getAllMessagesForOne");

	Message.findAll({ where: { UserId: req.params.id } })
		.then((messages) => {
			res.status(200).json({ messages });
		})
		.catch((error) => res.status(404).json({ error }));
};

// DEL message
// ===========
exports.deleteMessage = (req, res, next) => {
	console.log("deleteMessage");

	const paramId = parseInt(req.params.id);
	console.log(req.user);
	console.log(paramId);

	if (req.user === paramId) {
		Message.destroy({ where: { UserId: req.params.id } })
			.then(() => {
				res.status(200).json({ message: "Message(s) deleted" });
			})
			.catch((error) => res.status(400).json({ error }));
	} else {
		res.status(401).json({ message: "Unauthorized request" });
	}
};
