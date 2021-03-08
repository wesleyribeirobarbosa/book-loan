exports.save = (req,res) => {
    req.app.lendService.insert(req.body)
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};

exports.retrieve = (req,res) => {
    req.app.lendService.retrieve()
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};

exports.remove = (req,res) => {
    req.app.lendService.delete(req.body)
        .then((result => res.send(result)))
        .catch((err) => res.send(err));
};