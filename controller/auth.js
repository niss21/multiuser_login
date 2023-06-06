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