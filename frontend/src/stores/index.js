import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://vile-cat.onrender.com'
    //baseURL: 'http://localhost:3000'
})

export {
    instance
}