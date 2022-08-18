const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require('../helpers/catchAsync');
const { campgroundSchema } = require('../helpers/errorSchema');
const methodOverride = require('method-override');
const ExpressError = require('../helpers/ExpressError');
const Campground = require('../Models/campground');
const { isLoggedIn } = require('../middleware');

app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

router.get('/new', isLoggedIn, async(req, res) => {
    res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async(req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully deleted campground')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', catchAsync(async(req, res) => {
    const campgrounds = await Campground.findById(req.params.id).populate('reviews');
    if (!campgrounds) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campgrounds });
}))

router.get('/:id/edit', isLoggedIn, async(req, res) => {
    const campgrounds = await Campground.findById(req.params.id)
    if (!campgrounds) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campgrounds });
})

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground });
    req.flash('success', 'Successfully deleted campground')
    res.redirect(`/campgrounds/${campground._id}`);
})

router.delete('/:id', isLoggedIn, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect(`/campgrounds`);
}))

module.exports = router;