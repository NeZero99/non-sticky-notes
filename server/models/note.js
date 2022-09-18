const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    toDoList: [
        {
            value: {
                type: String
            },
            checked: {
                type: Boolean
            },
        }
    ],
    color: {
        type: String
    },
    textField: {
        type: String
    },
})

module.exports = mongoose.model('Note', NoteSchema);