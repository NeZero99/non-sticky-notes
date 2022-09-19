const User = require('../models/user');

module.exports.registerUser = async (req, res) => {
    const { username, email, password} = req.body;
    const user = new User({username, email});
    const newUser = await User.register(user, password);
    console.log(newUser);
    res.send(newUser);
}

module.exports.loginUser = async (req, res) => {
    res.send(req.user);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        res.send(null);
    });
}