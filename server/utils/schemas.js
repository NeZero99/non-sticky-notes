const Joi = require('joi');

module.exports.noteSchema = Joi.object({
  title: Joi.string().required(),
  color: Joi.string(),
  textField: Joi.string().allow(''),
  toDoList: Joi.array().items({
    _id: Joi.string().required(),
    value: Joi.string().required(),
    checked: Joi.boolean().required()
  })
});