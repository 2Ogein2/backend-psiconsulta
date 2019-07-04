const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/psicon', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))

  