class BookService {
    
    constructor(app) {
        if(!this.app) {
            this.app = app;
        }
    }

    //Get all books from database
    retrieve() {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Book.findAll()
                    .then(result => resolve({"success":result}))
                    .catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Register a new book
    insert(object) {
        return new Promise ((resolve, reject) => {
            try {
                this.app.googleApiService.getBook(object.code)
                    .then(response => {
                        if(response != null) {
                            object.info = response;
                        }
                        this.app.datasource.models.Book.create(object)
                        .then(result => resolve({"success":this.app.constants.bookRegisteredMsg}))
                        .catch(err => {
                            if (err.name == "SequelizeUniqueConstraintError") reject({"error":this.app.constants.bookExistsMsg});
                            if (err.name == "SequelizeForeignKeyConstraintError") reject({"error":this.app.constants.userNotFoundMsg});
                            else reject({"error":err});
                        });
                    }).catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Get a book by code
    retrieveByCode(code) {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Book.findAll({
                                raw: true,
                                where: {code: code}
                            }).then(result => resolve(result))
                            .catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Get a book by owner
    retrieveByOwner(email) {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Book.findAll({
                                raw: true,
                                where: {UserEmail: email}
                            }).then(result => resolve(result))
                            .catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Get all available books (books not lent)
    retrieveAvailableBooks() {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Book.findAll()
                    .then(result => {
                        this.app.lendService.retrieve()
                            .then(resultLend => {
                                if (!(resultLend.length > 0)) resolve({"success":result});
                                else {
                                    let iterator = 0;
                                    let finalList = result.slice();
                                    result.forEach(element => {
                                        resultLend.forEach(elementLend => {
                                            if (element.code == elementLend.BookCode) {
                                                finalList.splice(result.indexOf(element)-iterator,1);
                                                iterator++;
                                                return;
                                            }
                                        });
                                    });
                                    resolve(finalList);
                                }
                            }).catch(err => reject({"error":err}));
                    }).catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }
};

module.exports = BookService;