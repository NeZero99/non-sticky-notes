const Note = require('../models/note');
const colors = require('../data/colors.json');

module.exports.createNote = (req, res) => {
    //handling request and adding note to the database
    console.log(req.body);
    let {title, toDoList, color, textField} = req.body;
    toDoList = toDoList.map(el => {
        delete el._id
        return el
    })
    if(!colors.includes(color)) color = '#ffffff';
    const note = new Note({title, toDoList, color, textField});
    console.log(note);
    note.save();
    res.send(note);
}

module.exports.saveEditedNote = async (req, res) => {
    //updating note in the database
    const {id} = req.params;
    let {title, toDoList, color, textField} = req.body;
    toDoList = toDoList.map(el => {
        delete el._id
        return el
    })
    if(!colors.includes(color)) color = '#ffffff';
    const note = await Note.findByIdAndUpdate(id, {title, toDoList, color, textField}, {new: true});//new returns updated model
    console.log(note)
    res.send(note);
}

module.exports.showNotes = async (req, res, next) => {
    //sending all notes
    const notes = await Note.find({});
    res.send(notes)
}

module.exports.detailNote = async (req, res) => {
    //sending specific note
    const {id} = req.params;
    const note = await Note.findById(id);
    res.send(note);
}

module.exports.deleteNote = async (req, res) => {
    //deleting note
    const {id} = req.params;
    const {_id} = await Note.findByIdAndDelete(id);
    res.send(_id)
}