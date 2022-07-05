const internModel = require("../Models/InternModel")
let collegeModel = require('../Models/CollegeModel')
let { isValid, isValidName,isValidFName,isValidUrl } = require('../Validator/validation')

let createCollegeData = async function (req, res) {
   res.setHeader('Access-Control-Allow-Origin','*')
   try {
    

      let collegeData = req.body
      let collegedData = req.files
      
      const { name, fullName, logoLink } = collegeData

      if (Object.keys(collegeData).length == 0) return res.status(400).send({ status: false, msg: "Body can n`ot be empty " })

      if (!isValid(fullName)) return res.status(400).send({ status: false, msg: "fullName is required" })
      if (!isValidFName(fullName)) return res.status(400).send({ status: false, msg: "Pls Enter Valid fullName " })
    
      if (!isValid(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required" })
      if (!isValidUrl(logoLink)) return res.status(400).send({ status: false, msg: "Pls Enter Valid logoLink " })


      if (!isValid(name)) return res.status(400).send({ status: false, msg: "name is required field, please enter" })
      if (!isValidName(name)) return res.status(400).send({ status: false, msg: "please enter valid name(between A-Z or a-z)" })

      let checkNameNotDeleted = await collegeModel.findOne({ name: name, isDeleted: false })
      let checkNameifDeleted = await collegeModel.findOne({ name: name, isDeleted: true })

      if (checkNameNotDeleted) return res.status(400).send({ status: false, msg: "college name is already present " })
      if (checkNameifDeleted) return res.status(400).send({ status: false, msg: "data with this name already present but it is deleted ,undo the delete" })

      let saveData = await collegeModel.create(collegeData,collegedData)
      res.status(201).send({ status: true, Data: saveData })

   }
   catch (error) {
      console.log(error)
      return res.status(500).send({ msg: error.message })

   }
}


const getdetails = async function (req, res) {
   res.setHeader('Access-Control-Allow-Origin','*')
   try {
      const query = req.query
      if (Object.keys(query).length == 0) return res.status(400).send({ status: false, msg: "Don't Left Query Params Empty" })
      const query1 = query.collegeName.trim().toLowerCase()

      if (!isValid(query1)) return res.status(400).send({ status: false, msg: "Dont Left The Query Tag Value Empty" })
      let getCollegedetails = await collegeModel.findOne({ name: query1 },{name:1,fullName:1,logoLink:1,isDeleted:1}).lean() 

      if (!getCollegedetails) return res.status(404).send({ status: true, msg: "Sorrry!!! This College Name Doesn't Exists" })
      
      if (getCollegedetails.isDeleted === true) return res.status(400).send({ status: false, msg: "Sorry!!! This College Is Deleted" })
      let cljId = getCollegedetails._id

      let getInternDetails = await internModel.find({ collegeId: cljId }).select({ name: 1, email: 1, mobile: 1 })
      if (getInternDetails.length==0) return res.status(404).send({ status: false,msg: "Sorry!!!! This College Exists But No Interns Found"})

      getCollegedetails.interns=getInternDetails
      delete getCollegedetails._id
      delete getCollegedetails.isDeleted
     
      res.status(200).send({ status: true, data: getCollegedetails })
   }
   catch (err) {
      console.log(err)
     res.status(500).send({status:false,msg:err.message})
   }
}
module.exports = { createCollegeData, getdetails }