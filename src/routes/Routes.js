var route = require('express').Router();

const UserController = require('../api/controller/User');
const BookController = require('../api/controller/Book');
const LendController = require('../api/controller/Lend');

//User routes
route.route('/user')
    .get(UserController.retrieve)
    .post(UserController.save)
route.route('/user/by-email')
    .get(UserController.retrieveByEmail)

//Book routes
route.route('/book')
    .get(BookController.retrieve)
    .post(BookController.save)
route.route('/book/available')
    .get(BookController.retrieveAvailableBooks)

//Lend routes
route.route('/lend')
    .get(LendController.retrieve)
    .post(LendController.save)
    .delete(LendController.remove)

module.exports = route;