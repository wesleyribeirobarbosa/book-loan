exports.save = (req,res) => {
    req.app.bookService.insert(req.body)
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};

exports.retrieve = (req,res) => {
    req.app.bookService.retrieve()
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};

exports.retrieveAvailableBooks = (req,res) => {
    req.app.bookService.retrieveAvailableBooks()
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};