const bookObject = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        code:{
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        category:{
            type: DataTypes.STRING,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Book;
}

module.exports = bookObject;