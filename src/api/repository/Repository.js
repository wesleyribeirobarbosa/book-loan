var Sequelize = require('sequelize');
var Fs = require('fs');
var Path = require('path');

let database = null;

//Load all models from models folder
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

//Initializes the database
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

        //Setting relationships
        const User = database.models.User;
        const Book = database.models.Book;
        const Lend = database.models.Lend;

        //(1,n)
        User.hasMany(Book, {
            foreignKey: {
                allowNull: false
            }
        });
        Book.belongsTo(User);

        //(1,1)
        User.hasOne(Lend, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Lend.belongsTo(User);

        //(1,1)
        Book.hasOne(Lend, {
            foreignKey: {
                allowNull: false,
                unique: true
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Lend.belongsTo(Book);

        sequelize.sync().then(() => {
            return database;
        });
    }

    return database;
};

module.exports = dbInit;