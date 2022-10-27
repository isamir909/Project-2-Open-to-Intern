const express = require('express');
const router = express.Router();
const CollegeController= require("../controller/collegeController")
const InternController=require("../controller/internController")


//..........................Create College..........................//
router.post('/functionup/colleges',CollegeController.createCollegeData)

// ..........................Create Intern..........................//
router.post("/functionup/interns" ,InternController.createIntern)

// .....................Get College Details With All Interns.....................//
router.get("/functionup/collegeDetails",CollegeController.getDetails)

//....................in case of invalid URL.....(static route)...../
router.get('*',function (req,res){res.status(404).send({msg:"this page does not exist"})})


module.exports=router