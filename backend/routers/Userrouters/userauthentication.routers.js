const express = require('express')
const userModel = require('../../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const session = require('express-session')

const router = express.Router()

router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


router.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
}))

router.use(cookieParser())
router.use(express.json())

var token;

// const varifyUser = (req, res, next) => {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     if (!token) {
//         return res.status(404).json("Token is missing")
//     } else {
//         jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//             if (err) {
//                 return res.status(500).json("Error with token")
//             } else {
//                 if (decoded.role === "admin") {
//                     return res.status(200)
//                     next()
//                 } else {
//                     return res.json("not admin")
//                 }
//             }
//         })
//     }
// }

// router.post('/dashboard', varifyUser, (req, res) => {
//     res.json("Success")
// })

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key")
                        return res.status(200).json({ Status: "Success", token, user, email })
                    } else {
                        return res.status(500).json("The password is incorrect")
                    }
                })
            } else {
                return res.status(404).json("No record existed")
            }
        })
})

router.post('/signup', (req, res) => {
    const { username, email, password, mobileNumber } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ username, email, password: hash, mobileNumber })
                .then(user => res.json(true))
                .catch(err => res.json(err))
        }).catch(err => res.json(err))
})

router.get('/user/:id', async (req, res) => {
    // console.log(localStorage)
    const user = await userModel.findOne({});
    // res.json(user)
    console.log(user)
})

router.get('/login', async (req, res) => {
    // console.log(token)
    res.json(token);
})

module.exports = router

