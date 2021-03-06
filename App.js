var router = require('./src/routes/Routes');
var config = require('./config/Config');
var datasource = require('./src/api/repository/Repository');
const UserService = require('./src/api/service/User');
const BookService = require('./src/api/service/Book');
const express = require("express");
const app = express();

app.use(express.json())
app.use('/', router)
app.config = config;
app.datasource = datasource(app);
app.userService = new UserService(app);
app.bookService = new BookService(app);

module.exports = app;