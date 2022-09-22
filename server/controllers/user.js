const User = require('../models/user');

module.exports.returnUser = (req, res) => {
    res.send({
        user: req.user || null,
    });
}

module.exports.registerUser = async (req, res) => {
    const { username, email, password} = req.body;
    const user = new User({username, email});
    const newUser = await User.register(user, password);
    console.log(newUser);
    res.send({
        user: req.user || null,
    });
}

module.exports.failLogin = (req, res) => {
    res.status(401).send({
        success: false,
        message: 'failure'
    });
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        res.send({
            user: null,
        });
    });
}