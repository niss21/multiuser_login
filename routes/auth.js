const express = require('express');
const router = express.Router();


const User = require("../model/user")
const Recruiter = require('../model/recruiter');
const Applicant = require('../model/applicant');

router.post('/signup', async (req, res) => {
  // const { name, email, password, phoneNumber, role, company, education } = req.body;

  const data = req.body;

  let user = new User({
    email: data.email,
    password: data.password,
    role: data.role,
  })

  //   try {
  //     if (role === 'recruiter') {
  //       const newRecruiter = new Recruiter({
  //         userId: user._id,
  //         name:data.name,
  //         email: data.email,
  //         password: data.password,
  //         phoneNumber: data.phoneNumber,
  //         company: data.company,
  //       });

  //       const savedRecruiter = await newRecruiter.save();
  //       res.status(201).json(savedRecruiter);

  //     } else if (role === 'applicant') {
  //       const newApplicant = new Applicant({
  //         userId: user._id,
  //         name: data.name,
  //         email: data.email,
  //         password: data.password,
  //         phoneNumber: data.phoneNumber,
  //         education: data.education,
  //       });

  //       const savedApplicant = await newApplicant.save();
  //       res.status(201).json(savedApplicant);
  //     } else {
  //       res.status(400).json({ message: 'Invalid role' });
  //     }
  //   } catch (error) {
  //     console.log(err);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }

  user.save().then(() => {
    const userDetails = user.role == "recruiter" ? new Recruiter({
      userId: user._id,
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      company: data.company,
    })
      :
      new Applicant({
        userId: user._id,
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        education: data.education,
      });

    userDetails.save().then(() => {
      res.status(201).json(userDetails);
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
  const { email, password, role } = req.body;

  // const { email, password } = req.body;
  // const data = req.body;

  // console.log(req.body);
  try {
    // console.log("here");
    if (role === 'recruiter') {
      // const user = await User.findOne({ email });
      let user_pass = await User.findOne({ email: req.body.email }).select("password");

      if (user_pass.password !== password) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        res.status(200).json({ message: 'user login successful' });
      }
    }
    else if (role === 'applicant') {

      // const user = await User.findOne({ email });
      // console.log("here");
      // console.log(user);

      let user_pass = await User.findOne({ email }).select("password");
      // console.log(user_pass);
      // console.log(user_pass.password);
      // console.log(password);
      if (user_pass.password !== password) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        res.status(200).json({ message: 'user login successful' });
      }
    } else {
      res.status(400).json({ message: 'Invalid role' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

