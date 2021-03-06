const bookObject = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        name:{
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
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
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    return Book;
}

module.exports = bookObject;