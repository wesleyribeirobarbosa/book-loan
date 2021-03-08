class UserService {
    
    constructor(app) {
        if(!this.app) {
            this.app = app;
        }
    }

    //Get all users from database
    retrieve() {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.User.findAll()
                    .then(result => resolve({"success":result}))
                    .catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Get user from email
    retrieveByEmail(object) {
        return new Promise((resolve, reject) => {
            try {
                this.app.datasource.models.User.findAll({where:{email: object.email}})
                    .then(result => {
                        this.app.bookService.retrieveByOwner(object.email)
                            .then(resultBook => {
                                if (!(resultBook.length > 0)) resolve({"success":result});
                                else {
                                    this.app.lendService.retrieveByUser(object.email)
                                        .then(resultLend => {
                                            if (!(resultLend.length > 0)) {
                                                let jsonData = {};
                                                jsonData['User'] = result[0];
                                                jsonData['Books'] = resultBook;
                                                resolve({"success":jsonData});
                                            } else {
                                                let jsonData = {};
                                            jsonData['User'] = result[0];
                                            jsonData['Books'] = resultBook;
                                            jsonData['LentBooks'] = resultLend;
                                            resolve({"success":jsonData});
                                            }
                                        }).catch(err => reject({"error":err}));
                                }
                            }).catch(err => reject({"error":err}));
                    }).catch(err => reject({"error":err}));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    //Save a new user into database
    insert(object) {
        return new Promise ((resolve, reject) => {
            try {
                this.app.datasource.models.User.create(object)
                    .then(result => resolve({"success":this.app.constants.userSaveSuccessMsg}))
                    .catch(err => {
                        if (err.name == "SequelizeUniqueConstraintError") reject({"error":this.app.constants.userExistsMsg});
                        else reject({"error":err});
                    });
            } catch (err) {
                reject({"error":err});
            }
        });
    }
};

module.exports = UserService;