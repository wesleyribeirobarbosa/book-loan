const loanObject = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Loan;
}

module.exports = loanObject;