const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    url: String
})

module.exports = Person