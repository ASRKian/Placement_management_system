import express from 'express'
import Connection from './db/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import route from './Routes/route.js';

const app = express()

app.use(cors())
Connection()
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', route)

app.listen(8000, () => {
    console.log('server is listening on 8000 port');
})