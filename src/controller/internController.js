const internModel = require("../Models/InternModel")
let collegeModel = require('../Models/CollegeModel')
const { isValid, isValidName, isValidEmail, isValidMobile } = require("../Validator/validation")


const createIntern = async function (req, res) {
    try {
        const data = req.body
        const { name, email, mobile, collegeName } = req.body
       
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Body should not be empty " })
        const lowerCollegeName = collegeName.toString().toLowerCase()

        if (!("name" in data) || !("email" in data) || !("mobile" in data) || !("collegeName" in data)) return res.status(400).send({ status: false, msg: "Don't Skip The Required Attributes ('name','email','mobile','collegeName') " })

        if (!isValid(name)) return res.status(400).send({ status: false, msg: "Don't Left name attribute empty" })
        
        if (!isValidName(name)) return res.status(400).send({ status: false, msg: "Pls Enter Valid name" })

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "Don't left email attribute empty" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Pls Enter Valid Email" })

        if (!isValid(mobile)) return res.status(400).send({ status: false, msg: "Don't left mobile attribute empty" })
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Pls Enter Valid PAN India Number" })

        if (!isValid(collegeName)) return res.status(400).send({ status: false, msg: "Don't left college attribute empty and enter in shortname" })
        if (!isValidName(collegeName)) return res.status(400).send({ status: false, msg: "Pls Enter Valid College Name" })

        let checkunique = await internModel.findOne({ email: email })
        if (checkunique) return res.status(400).send({ status: false, msg: "Pls Use Unique Email" })

        let checkuniqueNo = await internModel.findOne({ mobile: mobile })
        if (checkuniqueNo) return res.status(400).send({ status: false, msg: "Pls Enter Unique Mobile No." })

        let cljId = await collegeModel.findOne({ name: lowerCollegeName }).select({ _id: 1,isDeleted:1 })
        if (!cljId) return res.status(404).send({ status: false, msg: " No college found ,Pls Enter Valid CollegName" })
        if (cljId.isDeleted == true) return res.status(404).send({ status: false, msg: "Sorry This College Is Deleted" })
        let id= cljId._id
        data.collegeId = id

        let createIntern = await internModel.create(data)
        res.send({ status: true, msg: "Intern Created", data: createIntern })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.createIntern = createIntern