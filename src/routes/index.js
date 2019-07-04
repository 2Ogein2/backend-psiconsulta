const { Router } = require('express')
const router = Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const faker = require('faker')
const { getCategory } = require('../helpers/helper')
const { getRole } = require('../helpers/helper')
const { getPhone }= require('../helpers/helper')

router.get('/', (req, res, next) => {
    res.send('hello')
})

router.post('/register', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        category: req.body.category,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    console.log(newUser)
    newUser.save(err => {
        if (err) {
            console.log('WRONG!!!! status: 400')
            return res.status(400).json({ // status 400 = client error
                title: 'error',
                error: 'EMAIL IN USE, PLEASE, INTRODUCE ANOTHER EMAIL'
            })
        }
        console.log('status: 200 ')
        return res.status(200).json({
            title: 'Register completed'
        })
    })
})

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email}, (err, user) => {
        if (err) return res.status(500).json({   // 500 Internal Server Error
            title: 'Server error',
            error: err
        })
        if(!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'INVALID USER'
            })
        }
        //incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'INVALID CREDENTIALS'
            })
        }
        // if all is GOOD create a token and send to frontend
        let token = jwt.sign({ userId: user._id}, 'secretkey')
        return res.status(200).json({
            title:'login success',
            token: token
        })
    })
})

// Grabbing user info
router.get('/user', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unathorized',          
        })

      // token is valid
       User.findOne({ _id: decoded.userId }, (err, user) => {
           if (err) return console.log(err)
           return res.status(200).json({
               title: 'user grabbed',
               user: {
                   email: user.email,
                   name: user.name,
                   phoneNumber: user.phoneNumber,
                   category: user.category,
                   role: user.role,
                   
               }
           })
       })
    })
})








// creando datos de therapist


router.get ('/create', (req, res) => {
    for (let i = 0; i<50; i++){
        User.create({
             name: faker.internet.userName(),
             email: faker.internet.email(),
             role: getRole(),
             category:  getCategory(),
             avatar: faker.internet.avatar(),
             phoneNumber: getPhone()
        })
    }
    res.send('50 registros creados')
})

router.get('/userst', async (req, res) => {
    const userst = await User.find();
    res.json({userst})
    })

module.exports = router;

