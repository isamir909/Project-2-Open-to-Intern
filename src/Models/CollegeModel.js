const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const collegeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required : true,
        unique : true,
    },
    fullName: {
        type: String,
        required : true,
    }, 
    
    logoLink: {
        type :String,
        required : true,
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    interns:[{
        type:ObjectId,
        ref:"InternDB"
    }]
}, {timestamps : true});

module.exports = mongoose.model ('collegeDB', collegeSchema)