const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const collegeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required : true,
        unique : true,
        trim:true,
        lowercase:true
    },
    fullName: {
        type: String,
        required : true,
        trim:true
    }, 
    
    logoLink: {
        type :String,
        required : true,
        trim:true
    },
    isDeleted : {
        type : Boolean,
        default : false,
    }
}, {timestamps : true});

module.exports = mongoose.model ('collegeDB', collegeSchema)