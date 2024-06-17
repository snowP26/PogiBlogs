const mongoose = require('mongoose');

const  scheme = new mongoose.Schema ({
    title:{
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
}, { timestamps: true} ); 

const blogs = mongoose.model('BlogsSchema', scheme);
module.exports = blogs;