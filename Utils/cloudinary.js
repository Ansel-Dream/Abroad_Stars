const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dfczjfcwf',
    api_key: 544182727772853,
    api_secret: '0u-KSYHyHQ31EKmgKFENUOibn-g',
});

const uploadfile = async (filepath) => {
    try {
        // Await the result of the upload
        const result = await cloudinary.uploader.upload(filepath);
        console.log(result); // Logs the result of the upload
        return result;
    } catch (error) {
        console.log('Error uploading file:', error);
        throw error;  // Optionally rethrow the error if you want to handle it further up the chain
    }
}

module.exports = { uploadfile };
