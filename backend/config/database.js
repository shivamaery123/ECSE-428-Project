import { Sequelize } from "sequelize";

const db = new Sequelize('user_db', 'root', 'aaaaaa', {
    host: "localhost",
    dialect: "mysql"
});

export default db;