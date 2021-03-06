var route = require('express').Router();

const UserController = require('../api/controller/User');
const BookController = require('../api/controller/Book');

//User routes
route.route('/user')
    .get(UserController.retrieve)
    .post(UserController.save)
    .put(UserController.edit)
    .delete(UserController.remove)

//Book routes
route.route('/book')
    .get(BookController.retrieve)
    .post(BookController.save)
    .put(BookController.edit)
    .delete(BookController.remove)

module.exports = route;