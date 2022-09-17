const express = require('express');
const router = express.Router();
const note = require('../controllers/note');
const catchAsync = require('../utils/catchAsync');
const {validateNote} = require('../utils/middlewares');

router.route('/')
    .post(validateNote, note.createNote)
    .get(catchAsync(note.showNotes))

router.route('/:id')
    .get(catchAsync(note.detailNote))
    .put(validateNote, catchAsync(note.saveEditedNote))
    .delete(catchAsync(note.deleteNote))

module.exports = router;