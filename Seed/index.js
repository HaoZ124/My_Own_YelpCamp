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
        var price = 60 + Math.floor(Math.random() * 100);
        const camp = new campGround({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${descriptors[Math.floor(Math.random()*descriptors.length)]} ${places[Math.floor(Math.random()*places.length)]}`,
            image: `https://picsum.photos/500/300?random=${i+1}`,
            description: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.",
            price: price,
        })
        await camp.save();
    }

}

seed().then(() => {
    mongoose.connection.close()
})