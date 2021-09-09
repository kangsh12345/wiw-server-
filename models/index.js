const Sequelize = require("sequelize");
const User = require('./user');
const E4F = require('./E4F');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db={};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.E4F = E4F;

User.init(sequelize);
E4F.init(sequelize);

module.exports = db;