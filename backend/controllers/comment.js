// La gestion des commentaires
const db = require("../models"); // les modèles sequelize
const Comment = db.comments;
const User = db.users;

// POST Create Comment
// ===================
exports.createComment = (req, res, next) => {
	console.log("createComment");

	const comment = new Comment({
		UserId: req.user,
		MessageId: req.body.messageId,
		comment: req.body.comment,
	});

	comment
		.save()
		.then(() => res.status(201).json({ message: "Comment posted" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET All comments for 1 message
// ==============================
exports.getAllComments = (req, res, next) => {
	console.log("getAllComments");

	console.log(req.body.messageId);

	Comment.findAll({
		where: {
			MessageId: req.body.messageId,
		},
	})
		.then((listComment) => res.status(200).json(listComment))
		.catch((error) => res.status(404).json({ error }));
};

// DELETE comment
// ==============
exports.deleteComment = (req, res, next) => {
	console.log("deleteComment");

	console.log(req.user);
	console.log(req.params.id);

	User.findOne({ where: { id: req.user } })
		.then((user) => {
			if (user.isAdmin) {
				// le demandeur est admin
				Comment.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Comment deleted !" }))
					.catch((error) => res.status(400).json({ error }));
			} else {
				// sinon, vérifions s'il est l'auteur du commentaire
				Comment.findOne({ where: { id: req.params.id } })
					.then((comment) => {
						if (comment.UserId === req.user) {
							Comment.destroy({ where: { id: req.params.id } })
								.then(() => res.status(200).json({ message: "Comment deleted !" }))
								.catch((error) => res.status(400).json({ error }));
						}
					})
					.catch((error) => res.status(404).json({ error }));
			}
		})
		.catch((error) => res.status(404).json({ error }));
};
