class LendService {
    
    constructor(app) {
        if(!this.app) {
            this.app = app;
        }
    }

    //Get all lends from database
    retrieve() {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Lend.findAll()
                    .then(result => resolve(result))
                    .catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Register a new lend
    insert(object) {
        return new Promise ((resolve, reject) => {
            try {
                this.app.bookService.retrieveByCode(object.BookCode)
                    .then(result => {
                        if (!(result.length > 0)) reject({"error":this.app.constants.bookNotFoundMsg});
                        else if (result[0].UserEmail == object.UserEmail) reject({"error":this.app.constants.bookBelongsUserMsg});
                        else this.app.datasource.models.Lend.create(object)
                                .then(result => resolve({"success":this.app.constants.lendRegisteredMsg}))
                                .catch(err => {
                            if (err.name == "SequelizeUniqueConstraintError") reject({"error":this.app.constants.bookLentMsg});
                            else if (err.name == "SequelizeForeignKeyConstraintError") reject({"error":this.app.constants.userNotFoundMsg});
                            else reject({"error":err});
                        });
                    }).catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Get a lend by user
    retrieveByUser(email) {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.Lend.findAll({
                                raw: true,
                                where: {UserEmail: email}
                            }).then(result => resolve(result))
                            .catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Deletes a lend from the database (give back a book)
    delete(object) {
        return new Promise((resolve, reject) => {
            try {
                if(object.code == '') reject({"error":this.app.constants.bookCodeValidMsg});
                else this.app.datasource.models.Lend.destroy({
                        where:{BookCode: object.code},
                        returning: true,
                        checkExistance: true
                    }).then(result => {
                        if (result == 0) reject({"error":this.app.constants.lendNotFoundMsg});
                        else resolve({"success":this.app.constants.lendDeletedMsg});
                    }).catch(err => {
                        reject({"error":err});
                    });
            } catch (err) {
                reject({"error":err});
            }
        });
    }
};

module.exports = LendService;