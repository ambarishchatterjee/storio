const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()]).{6,12})')).required(),
    profileImage: Joi.string().required()
})

module.exports = userSchema