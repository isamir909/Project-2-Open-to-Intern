const internModel = require("../Models/InternModel")
let collegeModel = require('../Models/CollegeModel')
let { isValid,isValidFName,isValidUrl } = require('../Validator/validation')

let createCollegeData = async function (req, res) {
   res.setHeader('Access-Control-Allow-Origin','*')
   try {
    
      let collegeData = req.body
     
      if (Object.keys(collegeData).length == 0) return res.status(400).send({ status: false, msg: "Body can n`ot be empty " })
      
      const { name, fullName, logoLink } = collegeData


      if (!isValid(fullName)) return res.status(400).send({ status: false, msg: "fullName is required" })
      if (!isValid(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required" })
      if (!isValid(name)) return res.status(400).send({ status: false, msg: "name is required field, please enter" })

      if (!isValidFName(fullName)) return res.status(400).send({ status: false, msg: "Pls Enter Valid fullName " }) 
      if (!isValidUrl(logoLink)) return res.status(400).send({ status: false, msg: "Pls Enter Valid logoLink " })
      if (!isValidFName(name)) return res.status(400).send({ status: false, msg: "please enter valid name(between A-Z or a-z)" })

      let checkNameNotDeleted = await collegeModel.findOne({ name: name, isDeleted: false })
      if (checkNameNotDeleted) return res.status(400).send({ status: false, msg: "college  is already registered " })
    
      let saveData = await collegeModel.create(collegeData)
      saveData=saveData.toObject()
      for(ele of ["createdAt","updatedAt","__v","_id"]){
          delete saveData[ele]
      }
      res.status(201).send({ status: true, Data: saveData })

   }
   catch (error) {
      console.log(error)
      return res.status(500).send({ msg: error.message })

   }
}


const getDetails = async function (req, res) {
   res.setHeader('Access-Control-Allow-Origin','*')
   try {
      const query = req.query
      
      if (Object.keys(query).length == 0) return res.status(400).send({ status: false, msg: "Don't Left Query Params Empty" })
      const query1 = query.collegeName.trim().toLowerCase()

      if (!isValid(query1)) return res.status(400).send({ status: false, msg: "Dont Left The Query Tag Value Empty" })
      let getCollegeDetails = await collegeModel.findOne({ name: query1 },{name:1,fullName:1,logoLink:1,isDeleted:1}).lean() 

      if (!getCollegeDetails) return res.status(404).send({ status: true, msg: " This College Name Doesn't Exists" })
      
      let SelectCollegeId = getCollegeDetails._id

      let getInternDetails = await internModel.find({ collegeId: SelectCollegeId }).select({ name: 1, email: 1, mobile: 1 })
      if (getInternDetails.length==0) return res.status(404).send({ status: false,msg: "No Interns Found"})

      getCollegeDetails.interns=getInternDetails
      delete getCollegeDetails._id
      delete getCollegeDetails.isDeleted
     
      res.status(200).send({ status: true, data: getCollegeDetails })
   }
   catch (err) {
    
     res.status(500).send({status:false,msg:err.message})
   }
}
module.exports = { createCollegeData, getDetails }