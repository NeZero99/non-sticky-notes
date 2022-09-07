const express = require('express');
const router = express.Router();
const note = require('../controllers/note');

router.route('/')
    .post(note.createNote)
    .get(note.showNotes)

router.route('/:id')
    .get(note.detailNote)
    .put(note.saveEditedNote)
    .delete(note.deleteNote)

module.exports = router;