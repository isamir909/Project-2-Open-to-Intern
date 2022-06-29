const internModel = require("../Models/InternModel")
let collegeModel = require('../Models/CollegeModel')
let { isValid, isValidName } = require('../Validator/validation')
let mongoose = require('mongoose')

let createCollegeData = async function (req, res) {
   try {
      let collegeData = req.body
      const { name, fullName, logoLink } = collegeData

      if (!isValid(fullName)) return res.status(400).send({ status: false, msg: "fullName is required" })
      if (!isValid(fullName)) return res.status(400).send({ status: false, msg: "fullName is required" })


      if (Object.keys(collegeData).length == 0) return res.status(400).send({ status: false, msg: "Body can not be empty " })

      if (!isValid(name)) return res.status(400).send({ status: false, msg: "name is required field, please enter" })
    //   if (!isValidName(name)) return res.status(400).send({ status: false, msg: "please enter valid name(between A-Z or a-z)" })

      let checkNameNotDeleted = await collegeModel.find({ name: name, isDeleted: false })
      let checkNameifDeleted = await collegeModel.find({ name: name, isDeleted: true })

      if (!isValid(fullName)) return res.status(400).send({ status: false, msg: "fullName is required" })
      if (!isValid(logoLink)) return res.status(400).send({ status: false, msg: "link is required" })

      if (checkNameNotDeleted.length) return res.status(400).send({ status: false, msg: "college name is already present " })
      if (checkNameifDeleted.length) return res.status(400).send({ status: false, msg: "data with this name already present but it is deleted ,undo the delete" })

      let saveData = await collegeModel.create(collegeData)
      res.status(201).send({ status: true, Data: saveData })

   }
   catch (error) {
      console.log(error)
      return res.status(500).send({ msg: error.message })

   }
}


const getdetails = async function (req, res) {
   try {
      const query = req.query
      const query1 = query.collegeName.trim().toLowerCase()
      console.log(query1)
      if (!isValid(query1)) return res.status(400).send({ status: false, msg: "Dont Left The Query Tag Value Empty" })
      if (Object.keys(query).length == 0) return res.status(400).send({ status: false, msg: "Don't Left Query Params Empty" })
      let getCollegedetails = await collegeModel.findOne({ name: query1 },{_id:1,name:1,logoLink:1,fullName:1} ).lean()
      if (getCollegedetails.isDeleted == true) return res.status(400).send({ status: false, msg: "Sorry!!! This College Is Deleted" })
      if (!getCollegedetails) return res.status(400).send({ status: true, msg: "Sorrry!!! This College Name Doesn't Exists" })
      let cljId = getCollegedetails._id

      let getInternDetails = await internModel.find({ collegeId: cljId }).select({ name: 1, email: 1, mobile: 1 })
      if (!getInternDetails) return res.status(400).send({ status: false, msg: "Sorry!!!! No Interns Found " })
      console.log(getCollegedetails)
  
      getCollegedetails.interns=getInternDetails
      delete getCollegedetails._id

      res.status(200).send({ status: true, data: getCollegedetails })
   }
   catch (err) {
     res.status(500).send({status:false,msg:err.message})
   }
}
module.exports = { createCollegeData, getdetails }


