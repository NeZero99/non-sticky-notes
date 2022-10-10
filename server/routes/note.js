const express = require('express');
const router = express.Router();
const note = require('../controllers/note');
const catchAsync = require('../utils/catchAsync');
const {validateNote, isLogedIn, isNoteAuthor} = require('../utils/middlewares');

router.route('/')
    .post(isLogedIn, validateNote, note.createNote)
    .get(isLogedIn, catchAsync(note.showNotes))

router.route('/:id')
    .get(isLogedIn, isNoteAuthor, catchAsync(note.detailNote))
    .put(isLogedIn, isNoteAuthor, validateNote, catchAsync(note.saveEditedNote))
    .delete(isLogedIn, isNoteAuthor, catchAsync(note.deleteNote))

module.exports = router;