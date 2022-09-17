const express = require('express');
const router = express.Router();
const note = require('../controllers/note');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .post(note.createNote)
    .get(catchAsync(note.showNotes))
    // .get(note.showNotes)

router.route('/:id')
    .get(catchAsync(note.detailNote))
    .put(catchAsync(note.saveEditedNote))
    .delete(catchAsync(note.deleteNote))

module.exports = router;