const {noteSchema} = require('./schemas.js');
const ExpressError = require('./ExpressError');
const Note = require('../models/note');

module.exports.validateNote = (req, res, next) => {
    const {error} = noteSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

module.exports.isLogedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.send({
            success: false,
            message: 'You are not loged in'
        });
    }
    next();
}

module.exports.isNoteAuthor = async (req, res, next) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if(!note.author.equals(req.user._id)){
        return res.send({
            success: false,
            message: 'You dont have permission to do that!'
        });
    }
    next();
}