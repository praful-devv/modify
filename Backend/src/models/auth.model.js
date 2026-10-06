const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

// authSchema.pre("save",function(next){})

// authSchema.post("save",function(next){})

const authModel = mongoose.model("Users",authSchema)

module.exports  = authModel