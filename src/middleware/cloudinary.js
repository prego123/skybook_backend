const { response } = require('express')
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: './env/.env.production' });
  } else {
    dotenv.config({ path: './env/.env' });
  }

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

module.exports = { cloudinary }