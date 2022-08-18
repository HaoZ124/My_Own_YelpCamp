const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const methodOverride = require('method-override');
const Campground = require('../Models/campground');
const Review = require('../Models/review');
const {reviewSchema} = require('../helpers/errorSchema')
const ExpressError = require('../helpers/ExpressError');
const catchAsync = require('../helpers/catchAsync');
const { isLoggedIn } = require('../middleware');

app.use(methodOverride('_method'));

const validateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join('');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;