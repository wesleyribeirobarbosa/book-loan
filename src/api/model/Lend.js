const lendObject = (sequelize, DataTypes) => {
    const Lend = sequelize.define('Lend', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Lend;
}

module.exports = lendObject;