const mongoose = require('mongoose');

const connectDB = async () => {
        await mongoose.connect('mongodb+srv://ansel:RfHG2WG6CenhQfNC@cluster0.eehom.mongodb.net/edu?retryWrites=true&w=majority&appName=Cluster0');
};

connectDB();

const applySchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    matric: { type: String, required: true }, // Store the Cloudinary URL
    Inter: { type: String, required: true } // Store the Cloudinary URL
});

const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
