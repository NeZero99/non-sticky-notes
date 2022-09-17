const Note = require('../models/note');

module.exports = (io, socket) => {
    //updating item boolean of the note
    socket.on('check_update', async ({noteId, itemId, value}) => {
        await Note.findOneAndUpdate(
            {'_id': noteId, 'toDoList._id': itemId},
            {
                $set: {
                    'toDoList.$.checked': value
                }
            }
        );  
        socket.emit('check_done', true);
    })
}