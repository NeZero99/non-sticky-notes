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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Note', NoteSchema);