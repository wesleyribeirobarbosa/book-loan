class LoanService {
    
    constructor(app) {
        if(!this.app) {
            this.app = app;
        }
    }

    retrieve() {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Loan.findAll().then(result => resolve(result)).catch((err) => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    insert(object) {
        return new Promise ((resolve, reject) => {
            try {
                this.app.bookService.retrieveByIsbn(object.BookIsbn).then(result => {
                    if (!(result.length > 0)) reject({"error":"Livro nao encontrado!"});
                    else if (result[0].UserEmail == object.UserEmail) reject({"error":"Livro ja pertence ao usuario!"});
                    else this.app.datasource.models.Loan.create(object).then(result => resolve(result)).catch((err) => {
                        if (err.name == "SequelizeUniqueConstraintError") reject({"error":"Livro ja emprestado!"});
                        else if (err.name == "SequelizeForeignKeyConstraintError") reject({"error":"Usuario nao encontrado!"});
                        else reject({"error":err});
                    });

                }).catch((err) => {
                    reject({"error":err})});
            } catch (err) {
                reject({"error":err});
            }
        });
    }

};

module.exports = LoanService;