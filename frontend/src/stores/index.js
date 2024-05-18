import axios from 'axios'

const instance = axios.create({
    //baseURL: 'https://agenda-sena.onrender.com'
    baseURL: 'http://localhost:3000'
})

export {
    instance
}