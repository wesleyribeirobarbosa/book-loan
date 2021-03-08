const router = require('./src/routes/Routes');
const config = require('./config/Config');
const constants = require('./src/utils/Constants');
const datasource = require('./src/api/repository/Repository');
const express = require("express");
const app = express();
const UserService = require('./src/api/service/User');
const BookService = require('./src/api/service/Book');
const LendService = require('./src/api/service/Lend');
const GoogleApiService = require('./src/api/service/GoogleApiService');

app.use(express.json())
app.use('/', router)
app.config = config;
app.constants = constants;
app.datasource = datasource(app);
app.userService = new UserService(app);
app.bookService = new BookService(app);
app.lendService = new LendService(app);
app.googleApiService = new GoogleApiService(app);

module.exports = app;