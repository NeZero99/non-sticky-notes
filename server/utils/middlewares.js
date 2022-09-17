const {noteSchema} = require('./schemas.js');
const ExpressError = require('./ExpressError');

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