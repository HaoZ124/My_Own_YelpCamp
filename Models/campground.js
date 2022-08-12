const mongoose = require('mongoose');
const Review = require('./review')
const schema = mongoose.Schema;

const campGroundSchema = new schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String,
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Campground', campGroundSchema);