import mongoose from 'mongoose'

const schemaShedule = new mongoose.Schema({
    contractor: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },

    publicWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },

    supervisor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    contract: {
        number: { type: String },
        date: {
            start: { type: Date },
            end: { type: Date }
        },
        contractorName: { type: String },
        publicName: { type: String },
        publicBranch: { type: String },
        object: { type: String },
        regional: { type: String },
        institute: { type: String }
    },

    typeSchedule: { type: String, default: 'contractor' },  // contractor - commission

    supervisor: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        position: { type: String }
    },

    paymaster: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        position: { type: String }
    },

    route: {
        go: [
            { data: { type: String } }
        ],
        return: [
            { data: { type: String } }
        ]
    },

    meanstransport: {
        go: [
            { data: { type: String } }
        ],
        return: [
            { data: { type: String } }
        ]
    },

    regional: { type: String },
    institute: { type: String },

    institutes: [
        { data: { type: String } }
    ],

    places: [
        { data: { type: String } }
    ],

    place: { type: String },
    company: { type: String },
    companyContact: { type: String },
    tripOrder: { type: String },
    tripStart: { type: Date },
    tripEnd: { type: Date },
    tripObjective: { type: String },
    duties: [
        { data: { type: String } }
    ],

    observations: [
        { data: { type: String } }
    ],

    activities: [
        { items: [ { data: { type : String }, time: { type: String} } ], date: { type: String } }
    ],

    signature: {
        contractor: { type: String },
        publicWorker: { type: String },
        supervisor: { type: String },
        paymaster: { type: String }
    },

    createdAt: { type: Date, default: Date.now },

    status: {
        number: { type: Number, default: 1 },
        data: { type: String },
        index: { type: Number },
        justification: { type: String }
    },

    // legalization

    legalization: {
        createdAt: { type: Date, default: Date.now },
        signature: {
            contractor: { type: String },
            publicWorker: { type: String },
            supervisor: { type: String }
        }
    },

    results: [
        { data: { type: String } }
    ],

    collections: [
        { name: { type: String }, items: [ { url: { type: String }, public_id: { type: String } }]}
    ],

    conclusions: [
        { data: { type: String } }
    ],

    tempUrl: [
        { url: {type: String}, folder: {type: String}, public_id: { type: String} }
    ]
})

export default mongoose.model('Schedule', schemaShedule)