class BookService {
    
    constructor(app) {
        if(!this.Book) this.Book = app.datasource.models.Book;
    }

    retrieve() {
        return new Promise((resolve, reject) => {
            try {
                this.Book.findAll().then(result => resolve(result)).catch((err) => reject(err));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

    insert(object) {
        return new Promise ((resolve, reject) => {
            try {
                this.Book.create(object).then(result => resolve(result)).catch((err) => reject(err));
            } catch (err) {
                reject({"error":err});
            }
        });
    }

};

module.exports = BookService;