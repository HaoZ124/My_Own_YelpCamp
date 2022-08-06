var mongoose = require('mongoose');
var schema = mongoose.Schema;

const campGroundSchema = new schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', campGroundSchema);