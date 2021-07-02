const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const router = require('./router')

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/', router)

const startApp = async () => {
    try {
        await mongoose.connect(process.env.URL_DB, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => { console.log(`Server started: http://localhost:${PORT}/`) })
    } catch (e) {
        console.log(e)
    }
}

startApp()