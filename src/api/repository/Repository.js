var Sequelize = require('sequelize');
var Fs = require('fs');
var Path = require('path');

let database = null;
const loadModels = (sequelize) => {
    const dir = Path.join(__dirname, '../model')
    let models = [];
    Fs.readdirSync(dir).forEach(file => {
        const modelDir = Path.join(dir, file);
        model = require(modelDir)(sequelize, Sequelize.DataTypes);
        models[model.name] = model;
    });
    return models;
}

const dbInit = (app) => {
    if(!database) {
        const config = app.config,
        sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        database = {
            sequelize,
            Sequelize,
            models: {}
        };

        database.models = loadModels(sequelize);

        sequelize.sync().then(() => {
            return database;
        });
    }

    return database;
};

module.exports = dbInit;