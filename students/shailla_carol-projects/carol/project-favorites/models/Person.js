const mongoose = require ('mongoose')

const Person = mongoose.model('Link', {
    Link: String, 
    URL:  String,
    approved: Boolean
})

module.exports = Link