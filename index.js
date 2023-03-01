const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.listen(8080, () => {
    console.log('Le serveur est en route => PORT: 8080')
})

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/entre2mains').then(console.log('Connecté à MongoDb avec succès !'))