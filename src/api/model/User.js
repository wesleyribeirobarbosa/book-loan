const userObject = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email:{
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
        surname:{
            type: DataTypes.STRING,
            allowNull: true
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return User;
}

module.exports = userObject;