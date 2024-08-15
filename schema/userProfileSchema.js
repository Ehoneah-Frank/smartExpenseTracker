import joi from 'joi';

export const userProfileSchema = joi.object({
    userId: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    bio: joi.string().allow(''), 
    dateOfBirth: joi.date().optional(),
    location: joi.string().optional(),
    profilePicture: joi.string().uri().optional(),  
});
