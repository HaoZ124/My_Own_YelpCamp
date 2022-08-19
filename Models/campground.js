const mongoose = require('mongoose');
const Review = require('./review')
const schema = mongoose.Schema;

const campGroundSchema = new schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String,
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

campGroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campGroundSchema);