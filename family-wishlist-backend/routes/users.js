const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getUserName/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => {res.json(user.username)})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const username = req.body.username;
    const avatarId = req.body.avatarId;

    const newUser = new User({
        username,
        avatarId
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;