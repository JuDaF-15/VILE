import Server from './server.js'

import cloudinary from 'cloudinary'

import 'dotenv/config'

const server = new Server()

server.listen()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})