import express from 'express'
import { getAllForms, newForm } from '../Controllers/FormController.js'
import UserController from '../Controllers/UserController.js'
import checkUserAuth from '../Middleware/AuthMiddleware.js'

const route = express.Router()

route.use('/data', checkUserAuth)

route.post('/form', newForm)
route.post('/data', getAllForms)

route.post('/login', UserController.userLogin)
route.post('/register', UserController.userRegistration)

export default route