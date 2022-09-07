const Note = require('../models/note');

module.exports.createNote = (req, res) => {
    // setTimeout(() => {
        let {title, toDoList, color, textField} = req.body;
        toDoList = toDoList.map(el => {
            delete el._id
            return el
        })
        const note = new Note({title, toDoList, color, textField});
        console.log(note);
        note.save();
        res.send(note);
    // }, 3000)
}

module.exports.saveEditedNote = async (req, res) => {
    const {id} = req.params;
    let {title, toDoList, color, textField} = req.body;
    toDoList = toDoList.map(el => {
        delete el._id
        return el
    })
    const note = await Note.findByIdAndUpdate(id, {title, toDoList, color, textField}, {new: true});//new je da bi vratio novi apdejtovani model
    console.log(note)
    res.send(note);
}

module.exports.showNotes = async (req, res) => {
    const notes = await Note.find({});
    res.send(notes)
}

module.exports.detailNote = async (req, res) => {
    const {id} = req.params;
    const note = await Note.findById(id);
    res.send(note);
}

module.exports.deleteNote = async (req, res) => {
    const {id} = req.params;
    const {_id} = await Note.findByIdAndDelete(id);
    res.send(_id)
}