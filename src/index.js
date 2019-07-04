const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')



require('./database')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) 

app.use('/', require('./routes/index'))



app.listen(3000, () => {
    console.log('server on port 3000')
})