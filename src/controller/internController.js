const InternModel= require("../Models/InternModel")
const validate=require("../Validator/validation")

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
const createIntern = async function (req,res){
    let data = req.body
    if(Object.keys(data).length==0) return res.status(400).send({status:false, msg:"Body should not be empty "})
    if(!("name" in data ) || !("email" in data) || !("mobile" in data) || !("collegeId" in data)) return res.status(400).send({status:false,msg:"Don't Skip The Required Attributes ('name','email','mobile','collegeId') "})

}
module.exports.createIntern=createIntern