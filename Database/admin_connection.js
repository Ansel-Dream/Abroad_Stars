let mongoose = require('mongoose');
// const env = require('dotenv').config();
let mongodburl = mongoose.connect('mongodb+srv://ansel:RfHG2WG6CenhQfNC@cluster0.eehom.mongodb.net/edu?retryWrites=true&w=majority&appName=Cluster0');

let schema = mongoose.Schema({
    Email : String,
    Password : String
});

let model = mongoose.model('admin',schema);

module.exports = model;
