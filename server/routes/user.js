const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const catchAsync = require('../utils/catchAsync');
const {validateNote} = require('../utils/middlewares');
const passport = require('passport');

router.route('/register')
    .post(user.registerUser)

router.route('/login')
    .post(passport.authenticate('local', {failureRedirect: '/notes'}), 
        user.loginUser)

router.route('/logout')
    .post(user.logout);

module.exports = router;