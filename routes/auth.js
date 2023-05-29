const express = require('express');
const router = express.Router();
const Recruiter = require('../model/recruiter'); 
const Applicant = require('../model/applicant');

router.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, role, company, education } = req.body;

  try {
    if (role === 'recruiter') {
      const newRecruiter = new Recruiter({
        name,
        email,
        password,
        phoneNumber,
        company,
      });

      // Save the recruiter to the database
      const savedRecruiter = await newRecruiter.save();
      res.status(201).json(savedRecruiter);
    } else if (role === 'applicant') {
      const newApplicant = new Applicant({
        name,
        email,
        password,
        phoneNumber,
        education,
      });

      const savedApplicant = await newApplicant.save();
      res.status(201).json(savedApplicant);
    } else {
      res.status(400).json({ message: 'Invalid role' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (role === 'recruiter') {
      const recruiter = await Recruiter.findOne({ email });

      if (!recruiter || recruiter.password !== password) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        res.status(200).json({ message: 'Recruiter login successful' });
      }
    } else if (role === 'applicant') {
      
      const applicant = await Applicant.findOne({ email });

      if (!applicant || applicant.password !== password) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        res.status(200).json({ message: 'Applicant login successful' });
      }
    } else {
      res.status(400).json({ message: 'Invalid role' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

