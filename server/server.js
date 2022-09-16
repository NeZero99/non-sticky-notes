const express = require('express');
const app = express();
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note');
const cors = require('cors');
const {Server} = require('socket.io');
const noteHandlers = require('./socketHandlers/noteHandlers');

app.use(cors())
app.use(express.json());

const port = 5000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'SET']
    }
})

const dbUrl = 'mongodb://localhost:27017/to-doing-list';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
})

app.use('/notes', noteRoutes);

io.on('connection', (socket) => {
    noteHandlers(io, socket);
})