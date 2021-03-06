let BookService = require('../service/Book');

exports.save = (req,res) => {
    req.app.bookService.insert(req.body).then((result => res.send(result))).catch((err) => res.send(err));
};

exports.retrieve = (req,res) => {
    req.app.bookService.retrieve().then((result => res.send(result))).catch((err) => res.send(err));
};

exports.edit = (req,res) => {
    res.send('NOT IMPLEMENTED: edit');
};

exports.remove = (req,res) => {
    res.send('NOT IMPLEMENTED: remove');
};