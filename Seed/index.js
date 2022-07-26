var mongoose = require('mongoose')
const campGround = require('../Models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
mongoose.connection.on('error',
    console.error.bind(console, 'Connection error:')
);
mongoose.connection.once('open', () => {
    console.log("DB connected");
})

const seed = async() => {
    await campGround.deleteMany({});
    for (var i = 0; i < 50; i++) {
        var rand = Math.floor(Math.random() * 1000);
        const camp = new campGround({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${descriptors[Math.floor(Math.random()*descriptors.length)]} ${places[Math.floor(Math.random()*places.length)]}`,
        })
        await camp.save();
    }

}

seed().then(() => {
    mongoose.connection.close()
})