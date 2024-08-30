import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    name: { type: String },
    mail: { type: String, required: true, unique: true, },
    identification: { type: String, unique: true },
    password: { type: String },
    role: {
        data: { type: String }, // user - supervisor - administrator - paymaster
        index: { type: Number }
    },

    staffType: {
        data: { type: String },
        index: { type: Number }
    },

    contract: {
        number: { type: String },
        date: { start: { type: String }, end: { type: String } }
    },

    object: { type: String },

    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },

    regional: { type: mongoose.Schema.Types.ObjectId, ref: 'County' },

    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    position: { type: String },
    branch: { type: String }, // coordinación administrativa
    sign: {
        url: { type: String },
        public_id: { type: String }
    },
    paymaster: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: Number, default: 1 },
    recuperacion: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', schemaUser)