exports.save = (req,res) => {
    req.app.userService.insert(req.body)
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};

exports.retrieve = (req,res) => {
    req.app.userService.retrieve()
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};

exports.retrieveByEmail = (req,res) => {
    req.app.userService.retrieveByEmail(req.body)
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};