import { Router } from 'express'
import City from '../models/city.js'

const routerCity = Router()

routerCity.get('/', [], async (req, res) => {
    const city = await City.find()
    return res.json(city)
})

routerCity.get('/search', [], async (req, res) => {
    const { county } = req.query

    const city = await City.find({county: county})

    return res.json(city)
})

routerCity.post('/', [], async (req, res) => {
    const city = new City(req.body)

    await city.save()

    return res.json({msg: 'Ciudad creada'})
})

export { routerCity }