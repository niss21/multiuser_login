// const User = require("../model/user");
// const Recruiter = require('../model/recruiter');
// const Applicant = require('../model/applicant');

// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken")

// const signup = async (req, res, next) => {

//     let hashed_password = "";

//     if (req.body.password) {
//         hashed_password = await bcrypt.hash(req.body.password, 10);
//     }

//     try {
//         let user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             role: req.body.role,
//             password: hashed_password,
//         })

//         user = user.toObject();
//         delete user.password
//         res.send(user)

//     } catch (err) {
//         next(err)
//     }
// }

// module.exports = {
//     signup
// }

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const User = require("../model/user")
const Recruiter = require('../model/recruiter');
const Applicant = require('../model/applicant');

const login = async (req, res, next) => {

    //   try {
    //       let user = await User.findOne({ email: req.body.email })
    //       if (user) {
    //         console.log(user);
    //         let user_pass_obj = await User.findOne({ email: req.body.email }).select("password")
    //         let match_status = await bcrypt.compare(req.body.password, user_pass_obj.password);
    //         if (match_status) {
    //           let token = jwt.sign(user.toObject(), 'shhhhh');
    //           return res.send({
    //             token: token
    //           })
    //         }
    //       }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log(user);
            let user_pass_obj = await User.findOne({ email: req.body.email }).select("password")
            let match_status = await bcrypt.compare(req.body.password, user_pass_obj.password);
            if (match_status) {
                let token = jwt.sign(user.toObject(), 'shhhhh');
                return res.send({
                    token: token
                })
            }
            
        }
        return res.status(401).send({
            msg: "Invalid Credentials"
        })
    } catch (err) {
        next(err)
    }
}

// let hashed_password = "";

// if (req.body.password) {
//     hashed_password = await bcrypt.hash(req.body.password, 10);
// }

// try {
//     let user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role,
//         password: hashed_password,
//     })

//     user = user.toObject();
//     delete user.password
//     res.send(user)
// } catch (err) {
//     next(err)
// }

// router.post('/signup', async (req, res) => {

const signup = async (req, res, next) => {
    let hashed_password = "";
    const data = req.body;
    if (data.password) {
        hashed_password = await bcrypt.hash(data.password, 10);
    }
    let user = new User({
        email: data.email,
        password: hashed_password,
        role: data.role,
    })

    user.save().then(() => {
        const userDetails = user.role == "recruiter" ? new Recruiter({
            userId: user._id,
            name: data.name,
            email: data.email,
            password: hashed_password,
            phoneNumber: data.phoneNumber,
            company: data.company,
        })
            :
            new Applicant({
                userId: user._id,
                name: data.name,
                email: data.email,
                password: hashed_password,
                phoneNumber: data.phoneNumber,
                education: data.education,
            });

        userDetails.save().then(() => {
            // res.status(201).json(userDetails);
            delete user.password
            res.send(userDetails)
        })
            .catch((err) => {
                console.log(err);
            })
    })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = {
    login,
    signup
}