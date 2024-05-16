import Schedule from '../models/schedule.js'

import cloudinary from 'cloudinary'

import fs from 'fs'

const httpSchedule = {
    getSchedule: async (req, res) => {
        const schedule = await Schedule.find()

        const data = []

        if(req.query.supervisor) {
            const { supervisor } = req.query

            for(let index = 0; index < schedule.length; index++) {
                if(req.query.historical) {
                    if(schedule[index].supervisor.id == supervisor && schedule[index].status.index !== 1 && schedule[index].status.index !== null) {
                        data.push(schedule[index])
                    }
                } else if(req.query.legalization) {
                    if(schedule[index].supervisor.id = supervisor && schedule[index].status.index == 5) {
                        data.push(schedule[index])
                    }
                } else {
                    if(schedule[index].supervisor.id == supervisor && schedule[index].status.index == 1) {
                        data.push(schedule[index])
                    }
                }
            }
        } else if(req.query.paymaster) {
            const { paymaster } = req.query

            for(let index = 0; index < schedule.length; index++) {
                if(schedule[index].paymaster.id == paymaster && schedule[index].status.index == 2) {
                    data.push(schedule[index])
                }
            }
        } else {
            if(req.query.legalization) {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == 6) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == 3) {
                        data.push(schedule[index])
                    }
                }
            }
        }

        return res.status(200).json(data)
    },


    getScheduleParams: async(req, res) => {
        const { id } = req.params

        const data = []

        if(req.query.contractor) {
            const schedule = await Schedule.find({contractor: id})

            if (req.query.historical) {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index !== null ) {
                        data.push(schedule[index])
                    }
                }
            } else if (req.query.legalization) {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == 4) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == null || schedule[index].status.index == 0) {
                        data.push(schedule[index])
                    }
                }
            }
        }

        if(req.query.publicWorker) {
            const schedule = await Schedule.find({publicWorker: id})

            if(req.query.legalization) {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == 4) {
                        data.push(schedule[index])
                    }
                }
            } else if(req.query.historical){
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status !== null) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == null || schedule[index].status.index == 0) {
                        data.push(schedule[index])
                    }
                }
            }
        }

        if(req.query.supervisor) {
            const schedule = await Schedule.find({supervisor_id: id})

            if(req.query.legalization) {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == 4) {
                        data.push(schedule[index])
                    }
                }
            } else if(req.query.historical) {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index !== null) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for(let index = 0; index < schedule.length; index++) {
                    if(schedule[index].status.index == 0 || schedule[index].status.index == null) {
                        data.push(schedule[index])
                    }
                }
            }

        }

        return res.status(200).json(data)
    },

    postSchedule: async (req, res) => {
        const schedule = new Schedule(req.body)

        await schedule.save()

        return res.status(200).json({msg: 'Agenda creada'})
    },

    putSchedule: async (req, res) => {
        const { id } = req.params

        await Schedule.findByIdAndUpdate(id, req.body)

        return res.status(200).json({msg: 'Agenda modificada'})
    },

    postLegalizacion: async (req, res) => {
        const { id } = req.params

        console.log(req.files)

        const schedule = await Schedule.findOne({_id: id})

        if(schedule.collections && schedule.collections.length !== 0) {
            for(let index = 0; index < schedule.collections.length; index++) {
                for(let mainIndex = 0; mainIndex < schedule.collections[index].items.length; mainIndex++) {
                    if(schedule.collections[index].items[mainIndex].public_id) {
                        try {
                            await cloudinary.v2.uploader.destroy(
                                schedule.collections[index].items[mainIndex].public_id,
                                {
                                    resource_type: 'image',
                                    type: 'upload'
                                }
                            )

                            // await cloudinary.v2.api.delete_folder(`test/img/${id}/${index}${mainIndex}`, {}, function(err, result) {
                            //     if(err) {
                            //         console.log(err)
                            //     }

                                // console.log(`${index}${mainIndex}`)

                            // })
                        } catch(error) {
                            console.log(error)
                        }
                    }
                }
            }
        }

        const data = []

        if(!req.files || Object.keys(req.files).length == 0) {
            return res.status(400).json({msg: 'Error, Archivos no encontrados'})
        }

        fs.exists('uploads', function(exists) {
            if(!exists) {
                fs.mkdir('uploads', function(error) {
                    if(error) {
                        console.log(error)
                    }
                })
            }
        })

        const keys = Object.keys(req.files)

        for(let index = 0; index < keys.length; index++) {
            // console.log(req.files[keys[index]])

            fs.exists(`uploads/${keys[index]}`, function(exists) {
                if(!exists) {
                    fs.mkdir(`uploads/${keys[index]}`, function(error) {
                        if(error) {
                            console.log(error)
                        }
                    })
                }

                
                req.files[keys[index]].mv(`uploads/${keys[index]}/${req.files[keys[index]].name}`, async function(err) {
                    if(err) {
                        console.log(err)
                    }

                    try {
                        const result = await cloudinary.v2.uploader.upload(
                            `uploads/${keys[index]}/${req.files[keys[index]].name}`,
                            {
                                public_id: 'file',
                                folder: `/test/img/${id}/${keys[index]}`,
                                // transformation: [
                                    // { width: 800, crop: 'limit'}
                                // ]
                            }
                        )

                        // console.log(result)

                        data.push({ url: result.secure_url, folder: keys[index], public_id: result.public_id })

                        fs.unlink(`uploads/${keys[index]}/${req.files[keys[index]].name}`, function(err) {
                            if(err) {
                                console.log(err)
                            }

                            fs.rmdir(`uploads/${keys[index]}`, function(err) {
                                if(err) {
                                    console.log(err)
                                }
                            })
                        })

                        if(data.length == keys.length) {
                            await Schedule.findByIdAndUpdate(id, { tempUrl: data })

                            return res.status(200).json({msg: 'Archivos almacenados en la nube'})
                        }

                    } catch(error) {
                        console.log(error)
                    }
                })
            })
        }

    },

    putLegalization: async(req, res) => {
        const { id } = req.params

        const { collections, status, legalization } = req.body

        const data = { results: req.body.results, conclusions: req.body.conclusions, legalization: { signature: {} } }

        const schedule = await Schedule.findOne({_id: id})

        if(schedule.legalization) {
            data.legalization = schedule.legalization
        }


        schedule.status.index = status.index

        schedule.status.data = status.data

        schedule.status.justification = status.justification ? status.justification : null

        data.status = schedule.status

        console.log(legalization)

        if(legalization.signature.supervisor) {
            data.legalization.signature.supervisor = legalization.signature.supervisor
        }

        if(legalization.signature.contractor) {
            data.legalization.signature.contractor = legalization.signature.contractor
        }

        if(legalization.signature.publicWorker) {
            data.legalization.signature.publicWorker = legalization.signature.publicWorker
        }

        if(legalization.createdAt) {
            data.legalization.createdAt = legalization.createdAt
        }

        if(status.index == 4) {
            data.legalization = legalization
        }

        console.log(data)

        if(schedule.tempUrl.length !== 0) {
            for(let index = 0; index < schedule.tempUrl.length; index++) {
                for(let mainIndex = 0; mainIndex < collections.length; mainIndex++) {
                    if(collections[mainIndex].keys.includes(schedule.tempUrl[index].folder)) {
                        collections[mainIndex].items.push({ url: schedule.tempUrl[index].url, public_id: schedule.tempUrl[index].public_id })
                    }
                }
            }
        }

        data.collections = collections

        data.tempUrl = []

        await Schedule.findByIdAndUpdate(id, data)

        return res.status(200).json({msg: 'Agenda prueba'})
    }
}

export { httpSchedule }