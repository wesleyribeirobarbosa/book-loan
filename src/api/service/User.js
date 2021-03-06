class UserService {
    
    constructor(app) {
        if(!this.User) this.User = app.datasource.models.User;
    }

    retrieve() {
        return new Promise((resolve, reject) => {
            try {
                this.User.findAll().then(result => resolve(result)).catch((err) => reject(err));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    insert(object) {
        return new Promise ((resolve, reject) => {
            try {
                this.User.create(object).then(result => resolve(result)).catch((err) => reject(err));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

};

module.exports = UserService;