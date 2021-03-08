let loanService = require('../service/Loan');

exports.save = (req,res) => {
    req.app.loanService.insert(req.body).then((result => res.send(result))).catch((err) => res.send(err));
};

exports.retrieve = (req,res) => {
    req.app.loanService.retrieve().then((result => res.send(result))).catch((err) => res.send(err));
};

exports.remove = (req,res) => {
    res.send('NOT IMPLEMENTED: remove');
};