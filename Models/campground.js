var mongoose = require('mongoose');
var schema = mongoose.Schema;

const campGroundSchema = new schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', campGroundSchema);