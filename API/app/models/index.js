const dbConfig = require("../db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const models = {};

models.client = require("./client.model.js")(sequelize, Sequelize);
models.phone = require("./phone.model.js")(sequelize, Sequelize);
models.address = require("./address.model.js")(sequelize, Sequelize);
models.product = require("./product.model.js")(sequelize, Sequelize);
models.product_client_link = require("./product_client_link.model")(sequelize, Sequelize);

Object.keys(models).forEach(function (modelName){
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

const db = {
    models: models
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
