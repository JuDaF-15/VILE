import express from 'express'
import connect from './database/index.js'

import fileupload from 'express-fileupload'

import { routerUser } from './routes/user.js'

import { routerSchedule } from './routes/schedule.js'

import { routerCounty } from './routes/county.js'
import { routerCity } from './routes/city.js'

import { routerInstitute } from './routes/institute.js'

import cors from 'cors'

class Server {
    constructor() {
        this.app = express()
        this.connect()
        this.middlewares()
        this.routes()
    }

    async connect() {
        await connect()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(fileupload({
            createParentPath: true,
            useTempFiles: true
        }))
    }

    routes() {
        this.app.use('/schedule', routerSchedule)
        this.app.use('/county', routerCounty)
        this.app.use('/city', routerCity)
        this.app.use('/institute', routerInstitute)
        this.app.use('/user', routerUser)
    }

    listen() {
        this.app.listen(process.env.PORT, () => { console.log('servidor iniciado!')})
    }
}

export default Server