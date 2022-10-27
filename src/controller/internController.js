const internModel = require("../Models/InternModel")
let collegeModel = require('../Models/CollegeModel')
const { isValid, isValidName, isValidEmail, isValidMobile } = require("../Validator/validation")



const createIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        res.setHeader('Access-Control-Allow-Origin','*')

        let data=req.body
        const { name, email, mobile, collegeName } = req.body
       
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "Body should not be empty " })
        
        if (!(isValid(name)) )return res.status(400).send({ status: false, msg: " Name is required field" })
        if (!(isValid(email)) )return res.status(400).send({ status: false, msg: "Email is required field" })
        if (!(isValid(mobile)) )return res.status(400).send({ status: false, msg: "Mobile number is required field " })
        if (!(isValid(collegeName)) )return res.status(400).send({ status: false, msg: "collegeName is required field" })
        
       
        if (!isValidName(name)) return res.status(400).send({ status: false, msg: "Pls Enter Valid name" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Pls Enter Valid Email" })
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Pls Enter Valid PAN India Number" })
       
        
        let checkUnique = await internModel.findOne({ email: email })
        if (checkUnique) return res.status(400).send({ status: false, msg: "this email is already registered Pls Use Unique Email" })
        
        let checkUniqueNo = await internModel.findOne({ mobile: mobile })
        if (checkUniqueNo) return res.status(400).send({ status: false, msg: "Pls Enter Unique Mobile No." })
         
        let FindCollege = collegeName.toString().toLowerCase()
        let collegeId = await collegeModel.findOne({ name: FindCollege }).select({ _id:1})
        if (!collegeId) return res.status(404).send({ status: false, msg: " No college found ,Pls Enter Valid College Name" })
     
        data.collegeId = collegeId._id

        let createIntern = await internModel.create(data)
    //   deleting extra key from object before sending to user 
        createIntern=createIntern.toObject()
        for(ele of ["createdAt","updatedAt","__v","_id"]){
            delete createIntern[ele]
        }
        res.status(201).send({ status: true, msg: "Intern Created", data: createIntern})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.createIntern = createIntern