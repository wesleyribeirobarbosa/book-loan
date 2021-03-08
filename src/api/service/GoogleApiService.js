require('dotenv').config();
const got = require('got');

class GoogleApiService {
    
  constructor() {}

  getBook(object) {
    return new Promise((resolve, reject) => {
        try {
          got(`https://www.googleapis.com/books/v1/volumes?q=${object}&key=${process.env.APIKEY}`)
          .then(response => {
            console.log(response.body.items[0].volumeInfo.description);
            resolve(response.body.items[0].volumeInfo.description);
          }).catch(err => {
            reject({"error":err});
          });
        } catch (err) {
            reject({"error":err});
        }
    });
  }
}
module.exports = GoogleApiService;