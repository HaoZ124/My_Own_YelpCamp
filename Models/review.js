const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rate: Number,
});

module.exports = mongoose.model('Review', reviewSchema);