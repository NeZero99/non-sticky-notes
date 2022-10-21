const User = require('../models/user');

module.exports.returnUser = (req, res) => {
    let user = null;
    if(req.user) user = (({_id, username}) => ({_id, username}))(req.user)//syntax for assigning only certain fields. This is type of object destructuring
    res.send({user});
}

module.exports.registerUser = async (req, res) => {
    const { username, email, password} = req.body;
    const user = new User({username, email});
    const newUser = await User.register(user, password);
    console.log(newUser);
    req.login(newUser, err => {
        if(err) return next(err);
        res.send({
            user: (({_id, username}) => ({_id, username}))(req.user) || null
        });
    })
}

module.exports.failLogin = (req, res) => {
    res.status(401).send({
        success: false,
        message: 'Incorrect username or password'
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