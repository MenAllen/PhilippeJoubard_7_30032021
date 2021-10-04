const Joi = require("joi");

// Signup et Login
// email : format email avec 2 domains segments (example.com)
// password : au moins 8 caractères, au moins une minuscule, au moins une majuscule, au moins un chiffre
const userSchema = Joi.object({
	email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z](?=.*[0-9])).{8,}$")).required(),
	name: Joi.string().trim().min(1),
});
exports.user = (req, res, next) => {
	console.log(req.body.email, req.body.password);
	const { error } = userSchema.validate(req.body);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid email or password" });
	} else {
		next();
	}
};

// Id passé en paramètre
const IdSchema = Joi.number().min(1).required();
exports.id = (req, res, next) => {
	const { error } = IdSchema.validate(req.params.id);
	if (error) {
		res.status(400).json({ error: " Joi: Invalid param Id" });
	} else {
		next();
	}
};

// Modele de message
const messageSchema = Joi.string().trim().min(1).max(500).required();
exports.message = (req, res, next) => {
	const { error } = messageSchema.validate(req.body.message);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid Message Data" });
	} else {
		next();
	}
};

// Modele de comment
const commentSchema = Joi.object({
	comment: Joi.string().trim().min(1).max(500).required(),
	messageId: Joi.number().min(1).required(),
});
exports.comment = (req, res, next) => {
	const { error } = commentSchema.validate(req.body);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid Comment Data" });
	} else {
		next();
	}
};

// messageId
const messageIdSchema = Joi.number().min(1).required();
exports.messageId = (req, res, next) => {
	const { error } = messageIdSchema.validate(req.body.messageId);
	if (error) {
		res.status(400).json({ error: " Joi: Invalid message Id" });
	} else {
		next();
	}
};

// like / dislike
const likeSchema = Joi.object({
	userId: Joi.string().alphanum().length(24).required(),
	like: Joi.valid(-1, 0, 1).required(),
});
exports.like = (req, res, next) => {
	const { error } = likeSchema.validate(req.body);
	if (error) {
		res.status(400).json({ error: "Joi: Invalid userId or like Data" });
	} else {
		next();
	}
};
