import mongoose from 'mongoose'

async function connect() {
    // 'mongodb://127.0.0.1:27017/test'
    // 'mongodb+srv://nuevosena23:aprendiz@cluster0.jxviqdh.mongodb.net/?retryWrites=true&w=majority'
    try {
        await mongoose.connect('mongodb+srv://nuevosena23:aprendiz@cluster0.jxviqdh.mongodb.net/?retryWrites=true&w=majority')
        console.log('connected!')
    } catch(error) {
        console.log(error)
    }
}

export default connect