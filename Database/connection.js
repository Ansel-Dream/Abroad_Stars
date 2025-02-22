let mongoose = require('mongoose');
// const env = require('dotenv').config();
let mongodburl = mongoose.connect('mongodb+srv://ansel:RfHG2WG6CenhQfNC@cluster0.eehom.mongodb.net/edu?retryWrites=true&w=majority&appName=Cluster0');

let schema = mongoose.Schema({
    Name: { type: String, required: true, },
    Email: { type: String, required: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, },
    Phone: { type: String, required: true, },
    Textarea: { type: String, },
    Date: { type: Date, default: Date.now, }
});

let model = mongoose.model('area', schema);

module.exports = model;
