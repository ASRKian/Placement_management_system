import express from 'express'
import { deleteForm, getAllForms, newForm, sendEmail, setSelection } from '../Controllers/FormController.js'
import UserController from '../Controllers/UserController.js'
import checkUserAuth from '../Middleware/AuthMiddleware.js'

const route = express.Router()

route.use('/data', checkUserAuth)
route.use('/send-mail', checkUserAuth)
route.use('/setSelection', checkUserAuth)
route.use('/deleteForm', checkUserAuth)

route.post('/form', newForm)
route.post('/data', getAllForms)
route.post('/send-mail', sendEmail)
route.patch('/setSelection', setSelection)
route.delete('/deleteForm', deleteForm)

route.post('/login', UserController.userLogin)
route.post('/register', UserController.userRegistration)

export default route