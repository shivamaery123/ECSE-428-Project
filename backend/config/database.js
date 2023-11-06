const Sequelize = require("sequelize");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "MyNewPass",
  database: "ecse",
  dialect: "mysql",
};

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

db.authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

module.exports = db;
