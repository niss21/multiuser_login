const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

const cors = require("cors");
require('dotenv').config()

// Setting up middlewares
app.use(cors());
app.use(express.json());

app.use(express.static('uploads'));

// routes
app.use("/api", require("./routes/auth.js"));
app.use("/api", require("./routes/jobs.js"));
app.use("/api", require("./routes/jobapplied.js"));

app.get('/',  (req, res)=> {
  res.send('Hello World')
})

app.use((err, req, res, next) => {

  let status_code = 500;
  let msg = "Server Error"
  let errors = [];

  console.log(err.name)
  console.log("code", err.code)

  if (err.name == "ValidationError") {
      status_code = 400;
      msg = "Bad request"

      Object.entries(err.errors).map(error => {
          errors.push({
              param: error[0],
              msg: error[1].message
          })
      })
  } else {
      if (err.code == 11000) {
          status_code = 400;
          msg = "Bad request"
          errors.push({
              param: "email",
              msg: "Duplicate email "
          })
      }
  }

  res.status(status_code).send({
      msg: msg,
      errors,
      error: err.message
  })
})

require("./db/conn.js");
app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`)
})