const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const User = require("../model/user")
const Recruiter = require('../model/recruiter');
const Applicant = require('../model/applicant');

router.post('/signup', async (req, res) => {

  let hashed_password = "";

  // try {
  //     let user = await User.create({
  //         name: req.body.name,
  //         email: req.body.email,
  //         role: req.body.role,
  //         password: hashed_password,
  //     })

  //     user = user.toObject();
  // delete user.password
  // res.send(user)

  // } catch (err) {
  //     next(err)
  // }

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
});

router.post('/login', async (req, res) => {

  // const { email, password, role } = req.body;

  try {

    if (req.body.role === 'recruiter') {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        console.log(user);
        let user_pass_obj = await User.findOne({ email: req.body.email }).select("password")
        let match_status = await bcrypt.compare(req.body.password, user_pass_obj.password);
        if (user.role == 'recruiter' && match_status) {
          let token = jwt.sign(user.toObject(), 'shhhhh');
          return res.send({
            token: token
          })
        }
      }
    }

    if (req.body.role == 'applicant') {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        let user_pass_obj = await User.findOne({ email: req.body.email }).select("password")
        let match_status = await bcrypt.compare(req.body.password, user_pass_obj.password);
        if (user.role == 'applicant' && match_status) {
          let token = jwt.sign(user.toObject(), 'shhhhh');
          return res.send({
            token: token
          })
        }
      }
    }

    return res.status(401).send({
      msg: "Invalid Credentials"
    })
  } catch (err) {
    next(err)
  }

  // try {

  //   if (role === 'recruiter') {

  //     let user_pass = await User.findOne({ email: req.body.email }).select("password");
  //     if (user_pass.password !== password) {
  //       res.status(401).json({ message: 'Invalid email or password' });
  //     } else {
  //       res.status(200).json({ message: 'user login successful' });
  //     }
  //   }
  //   else if (role === 'applicant') {

  //     let user_pass = await User.findOne({ email }).select("password");
  //     if (user_pass.password !== password) {
  //       res.status(401).json({ message: 'Invalid email or password' });
  //     } else {
  //       res.status(200).json({ message: 'user login successful' });
  //     }
  //   } else {
  //     res.status(400).json({ message: 'Invalid role' });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
});


// router.post("/signup", (req, res) => {
//   const data = req.body;
//   let user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//   });

//   user
//     .save()
//     .then(() => {
//       const userDetails =
//         user.type == "recruiter"
//           ? new Recruiter({
//               userId: user._id,
//               name: data.name,
//               contactNumber: data.contactNumber,
//               bio: data.bio,
//             })
//           : new JobApplicant({
//               userId: user._id,
//               name: data.name,
//               education: data.education,
//               skills: data.skills,
//               rating: data.rating,
//               resume: data.resume,
//               profile: data.profile,
//             });

//       userDetails
//         .save()
//         .then(() => {
//           // Token
//           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//           res.json({
//             token: token,
//             type: user.type,
//           });
//         })
//         .catch((err) => {
//           user
//             .deleteOne()
//             .then(() => {
//               res.status(400).json(err);
//             })
//             .catch((err) => {
//               res.json({ error: err });
//             });
//           err;
//         });
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.post("/login", (req, res, next) => {
//   console.log(here);
//   passport.authenticate(
//     "local",
//     { session: false },
//     function (err, user, info) {
//       if (err) {

//         return next(err);
//       }
//       if (!user) {
//         res.status(401).json(info);
//         return;
//       }

//       // Token
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       res.json({
//         token: token,
//         type: user.type,
//       });
//     }
//   )(req, res, next);
// });

module.exports = router;

