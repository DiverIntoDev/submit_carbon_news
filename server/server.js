const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()


// Middleware
app.use(bodyParser.json());
app.use(express.static('public')) 
app.use(cors());

const path = require('path')
const port = 4000;

const posts = require('../server/routes/api/posts')
const pointsTable = require('../server/routes/api/emailCounter')

mongoose.connect(
    process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
)
.then(() => console.log('Connected to mongoDB.'))
.catch((err) => console.log(err))

app.use('/api/posts', posts)
app.use('/api/points', pointsTable)

if(process.env.NODE_ENV === "production"){
    app.use(express.static('test-app/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'test-app', 'dist', 'index.html'))
    })
}

app.listen(port, () => console.log(`http://localhost:4000/api/ Started on ${port}`))

