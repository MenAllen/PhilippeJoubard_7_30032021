// module de connexion à la base de données

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: "localhost",
	dialect: "mysql",
	port: 3306,
});

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.messages = require("./message.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

db.users.hasMany(db.messages, { onDelete: "CASCADE", hooks: true });
db.messages.belongsTo(db.users, { onDelete: "CASCADE", hooks: true });

db.messages.hasMany(db.comments, { onDelete: "CASCADE", hooks: true });
db.comments.belongsTo(db.messages);

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

//db.comments.hasOne(db.comments);

module.exports = db;
