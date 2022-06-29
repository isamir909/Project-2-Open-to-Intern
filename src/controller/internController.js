const internModel= require("../Models/InternModel")
let collegeModel=require('../Models/CollegeModel')
const {isValid,isValidName,isValidEmail,isValidMobile}=require("../Validator/validation")

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
const createIntern = async function (req,res){
    const data = req.body
    const{name,email,mobile,collegeName}=req.body

    if(Object.keys(data).length==0) return res.status(400).send({status:false, msg:"Body should not be empty "})
    if(!("name" in data ) || !("email" in data) || !("mobile" in data) || !("collegeName" in data)) return res.status(400).send({status:false,msg:"Don't Skip The Required Attributes ('name','email','mobile','collegeName') "})

    if(!isValid(name)) return res.status(400).send({status:false,msg:"Don't Left name attribute empty"})
    if(!isValidName(name)) return res.status(400).send({status:false,msg:"Pls Enter Valid name"})

    if(!isValid(email)) return res.status(400).send({status:false,msg:"Don't left email attribute empty"})
    if(!isValidEmail(email)) return res.status(400).send({status:false,msg:"Pls Enter Valid Email"})

    if(!isValid(mobile)) return res.status(400).send({status:false,msg:"Don't left mobile attribute empty"})
    if(!isValidMobile(mobile)) return res.status(400).send({status:false,msg:"Pls Enter Valid PAN India Number"})
    
    if(!isValid(collegeName)) return res.status(400).send({status:false,msg:"Don't left college attribute empty and enter in shortname"})
    if(!isValidName(collegeName)) return res.status(400).send({status:false,msg:"Pls Enter Valid College Name"})
    
    
    let checkUniqueNo= await internModel.findOne({$and:[{mobile:req.body.mobile},{email:req.body.email }]}).select({mobile:1,_id:0,email:1})
    console.log(checkUniqueNo.mobile)
    console.log(checkUniqueNo.email)
    if(checkUniqueNo) return res.status(400).status({status:false,msg:"Pls Use Unique Mobile No. .....This Mobile No. Already Exists "})
    
    // if("email" in data){
    // let checkunique= await internModel.findOne({email:req.body.email}).select({email:1,_id:0})
    // console.log(checkunique)
    // if (checkunique) return res.status(400).send({status:false,msg:"Pls Use Unique Email....This Email Already Exists"})
    // }

    let cljId=await collegeModel.findOne({name:collegeName}).select({_id:1,isDeleted:1})
    if(!cljId) return res.status(400).send({status:false,msg:"Pls Enter Valid CollegName"})
    data.collegeId=cljId

    let createIntern=await internModel.create(data)
    res.send({status:true,msg:"Intern Created",data:createIntern})

}
module.exports.createIntern=createIntern