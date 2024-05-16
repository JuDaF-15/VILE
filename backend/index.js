import Server from './models/server.js'

import cloudinary from 'cloudinary'

import 'dotenv/config'

const server = new Server()

server.listen()

cloudinary.v2.config({
    cloud_name: 'test-001',
    api_key: '642124999743278',
    api_secret: 'x7u6klEoaBOKYKbE9S_C7_3V4G0',
    secure: true,
})