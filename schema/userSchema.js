import joi from 'joi'

export const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
});