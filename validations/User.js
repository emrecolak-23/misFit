// Import Joi
const Joi = require('joi');

const registerValidation = Joi.object({
  name: Joi.string().required().min(5),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6),
  image: Joi.string(),
  role: Joi.string()
});

const loginValidation = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6),
})

module.exports = {
  registerValidation,
  loginValidation
}