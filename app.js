var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
const campGround = require('./Models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
mongoose.connection.on('error',
    console.error.bind(console, 'Connection error:')
);
mongoose.connection.once('open', () => {
    console.log("DB connected");
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makecampground', async(req, res) => {
    var camp = new campGround({ title: 'My Campground' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})