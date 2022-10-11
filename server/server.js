if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note');
const userRoutes = require('./routes/user');
const cors = require('cors');
const { Server } = require('socket.io');
const noteHandlers = require('./socketHandlers/noteHandlers');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require("passport-local");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(cors());
app.use(express.json());//middleware for passing json

//connecting server to a port
const port = 5000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
//socket connection
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'SET']
    }
})

//database connection
const dbUrl = 'mongodb://localhost:27017/to-doing-list';
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
})

//session initialization
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'testSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
//passport initialization
app.use(passport.initialize());
app.use(passport.session());
//local auth
passport.use(new LocalStrategy(User.authenticate()));
//google auth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "user/login/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return done(null, profile);
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use('/notes', noteRoutes);
app.use('/user', userRoutes);

//socket connection
io.on('connection', (socket) => {
    noteHandlers(io, socket);
})

//error middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something is wrong!';
    console.log(`Error message: ${err.message}\nStatus code: ${statusCode}`);
    res.status(statusCode).send(err.message);
})