import { Router } from 'express'

import { httpSchedule } from '../controllers/schedule.js'

const routerSchedule = Router()

routerSchedule.get('/', [], httpSchedule.getSchedule )

routerSchedule.get('/:id', [], httpSchedule.getScheduleParams )

routerSchedule.post('/', [], httpSchedule.postSchedule )

routerSchedule.put('/:id', [], httpSchedule.putSchedule )

routerSchedule.post('/legalization/:id', [], httpSchedule.postLegalizacion )

routerSchedule.put('/legalization/:id', [], httpSchedule.putLegalization )

export { routerSchedule }