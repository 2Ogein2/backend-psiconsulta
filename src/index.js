const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')


 
require('./database')

app.set('port', process.env.PORT || 3000)
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) 

app.use('/', require('./routes/index'))


var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
})
// app.listen(app.get('port'), () => {
//     console.log('server on port', app.get('port'))
