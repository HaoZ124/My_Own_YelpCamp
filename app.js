var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const campGround = require('./Models/campground')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
mongoose.connection.on('error',
    console.error.bind(console, 'Connection error:')
);
mongoose.connection.once('open', () => {
    console.log("DB connected");
})

app.use(express.urlencoded({ extend: true }));

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.use(methodOverride('_method'));

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await campGround.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/new', async(req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async(req, res) => {
    const campground = new campGround(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async(req, res) => {
    const campgrounds = await campGround.findById(req.params.id)
    res.render('campgrounds/show', { campgrounds })
})

app.get('/campgrounds/:id/edit', async(req, res) => {
    const campgrounds = await campGround.findById(req.params.id)
    res.render('campgrounds/edit', { campgrounds })
})

app.put('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    const campground = await campGround.findByIdAndUpdate(id, {...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
})

app.delete('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    const campground = await campGround.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})