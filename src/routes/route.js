const express = require('express');
const router = express.Router();
const CollegeController= require("../controller/collegeController")
const InternController=require("../controller/internController")



router.post('/functionup/colleges',CollegeController.createCollegeData)

router.post("/functionup/interns" ,InternController.createIntern)

router.get("/functionup/collegeDetails",CollegeController.getdetails)



module.exports=router