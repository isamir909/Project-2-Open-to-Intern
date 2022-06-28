const express = require('express');
const router = express.Router();
const CollegeController= require("../controller/collegeController")
const InternController=require("../controller/internController")



router.post('/functionup/colleges',CollegeController.createCollegeData)

router.post("/functionup/interns" ,InternController.createIntern)





module.exports=router