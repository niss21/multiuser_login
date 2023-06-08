const express = require("express");
const path = require("path")
const router = express.Router();
const multer = require('multer')

const { isRecruiter, checkAuthentication } = require("../middleware/auth")
const { getalljobs,getjobs,getjobbyid,postjobs,putjob,deletejob } = require("../controller/jobs");
const storage = require("../multer/storageConfig");

const upload = multer({ storage: storage })

router.get("/jobs", getjobs)
router.get("/alljobs", getalljobs)
router.post("/jobs", checkAuthentication, isRecruiter, upload.array('images', 12), postjobs)
router.put("/jobs/:id", checkAuthentication, isRecruiter, upload.array('images', 12),putjob)
router.get("/jobs/:id", upload.array('images', 12), getjobbyid)
router.delete("/jobs/:id", checkAuthentication, isRecruiter, deletejob)

module.exports = router;