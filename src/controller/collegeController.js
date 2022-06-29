const { response } = require('express')
let collegeModel=require('../Models/CollegeModel')
let {isValid,isValidName}=require('../Validator/validation')
let mongoose=require('mongoose')







let createCollegeData = async function(req,res){
   try { 
    let collegeData=req.body 
    const{name ,fullName,logoLink }=collegeData
  
    if(!isValid(fullName)) return res.status(400).send({status:false, msg:"fullName is required"})
    if(!isValid(fullName)) return res.status(400).send({status:false, msg:"fullName is required"})
 
  
    if(Object.keys(collegeData).length==0) return res.status(400).send({status:false, msg:"Body can not be empty "})

    if(!isValid(name)) return res.status(400).send({status:false,msg:"name is required field, please enter"})
    if(!isValidName(name)) return res.status(400).send({status:false,msg:"please enter valid name(between A-Z or a-z)"})   
  
    let Lname=name.toString().toLowerCase()
    collegeData.name=Lname
    
    let checkNameNotDeleted= await collegeModel.find({name:name,isDeleted:false})
    let checkNameifDeleted= await collegeModel.find({name:name,isDeleted:true})

    if(!isValid(fullName)) return res.status(400).send({status:false, msg:"fullName is required"})
    if(!isValid(logoLink))return res.status(400).send({status:false,msg:"link is required"})

    if(checkNameNotDeleted.length !=0)return res.status(400).send({status:false,msg:"college name is already present "}) 
    if(checkNameifDeleted.length!=0)return res.status(400).send({status:false,msg:"data with this name already present but it is deleted ,undo the delete"})
  
    let saveData=await  collegeModel.create(collegeData)
    res.status(201).send({status:true,Data:saveData})
    
   }
    catch (error) {
        console.log(error)
        return res.status(500).send({msg:error.message})
    
     } 
     } 
module.exports.createCollegeData=createCollegeData