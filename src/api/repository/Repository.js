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

        //Definindo relacionamentos
        const User = database.models.User;
        const Book = database.models.Book;
        const Loan = database.models.Loan;

        User.hasMany(Book, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Book.belongsTo(User);

        User.hasOne(Loan, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Loan.belongsTo(User);

        Book.hasOne(Loan, {
            foreignKey: {
                allowNull: false,
                unique: true
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Loan.belongsTo(Book);

        //-----------------------------//

        sequelize.sync().then(() => {
            return database;
        });
    }

    return database;
};

module.exports = dbInit;