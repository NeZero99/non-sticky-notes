if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3002;

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
const path = require('path');

app.use(cors());
app.use(express.json());//middleware for passing json

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//connecting server to a port
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
passport.deserializeUser(async (_id, done) => {
    const currentUser = await User.findById({ _id });
    console.log(currentUser);
    done(null, currentUser);
});

//routes
app.use('/api/notes', noteRoutes);
app.use('/api/user', userRoutes);

//socket connection
io.on('connection', (socket) => {
    noteHandlers(io, socket);
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//error middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something is wrong!';
    console.log(`Error message: ${err.message}\nStatus code: ${statusCode}`);
    res.status(statusCode).send(err.message);
})