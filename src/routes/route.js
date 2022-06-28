const express = require("express")
const router = express.Router();
const collegeController = require("../controller/collegeController");





// Create a college - a document for each member of the group

// The logo link will be provided to you by the mentors. This link is a s3 (Amazon's Simple Service) url. Try accessing the link to see if the link is public or not.

// Endpoint: BASE_URL/functionup/colleges
// ## College Model
// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

let validate=function(value){
    if(value.trim()===""|| value===null) return false
    if(typeof value==="string" ||typeof value==="undefined")return false
    return true;
}


router.post('/functionup/colleges',async function(req,res){
    let collegeData=req.body
    const{name ,fullName,logoLink }=collegeData
    if(!validate(name))    
    let saveData=await  collegeDB.create(collegeData)

})


module.exports=router