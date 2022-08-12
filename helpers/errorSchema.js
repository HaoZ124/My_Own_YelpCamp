const joi = require('joi')

module.exports.errorSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required()
    })
}).required()

module.exports.reviewSchema = joi.object({
    Review: joi.object({
        comment: joi.string().required(),
        rate: joi.number().required()
    }).required()
})