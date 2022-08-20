const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const methodOverride = require('method-override');
const Campground = require('../models/campground');
const Review = require('../models/review');
const catchAsync = require('../helpers/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

app.use(methodOverride('_method'));

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;