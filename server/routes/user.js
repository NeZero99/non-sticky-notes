const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.route('/')
    .get(user.returnUser);

router.route('/register')
    .post(catchAsync(user.registerUser));

router.route('/login')
    .post(passport.authenticate('local', { failureRedirect: '/user/login/failed' }), 
        user.returnUser);

router.route('/login/google')
    .get(passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

router.route('/login/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/user',
        failureRedirect: 'user/login/failed'
     }));

router.route('/login/failed')
    .get(user.failLogin);

router.route('/logout')
    .post(user.logout);

module.exports = router;