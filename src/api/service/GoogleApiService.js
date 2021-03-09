require('dotenv').config();
const got = require('got');

class GoogleApiService {
    
  constructor() {}

  getBook(object) {
    return new Promise((resolve, reject) => {
        try {
          got(`https://www.googleapis.com/books/v1/volumes?q=${object}&key=${process.env.APIKEY}`,{useJson: true})
          .then(response => {
            let responseData = JSON.parse(response.body);
            if(responseData.totalItems == 0) {
              resolve(null);
            };
            let volumeInfo = responseData.items[0].volumeInfo;
            let info = {
              publisher: volumeInfo.publisher,
              publishedDate: volumeInfo.publishedDate,
              description: volumeInfo.description,
              pageCount: volumeInfo.pageCount
            };
            resolve(info);
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