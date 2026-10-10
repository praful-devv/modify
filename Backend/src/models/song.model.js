const mongoose = require("mongoose")
const { type } = require("../config/cache")

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["sad","happy","surprised","angry"]
        }
    }
})

const songModel = mongoose.model("song",songSchema)

module.exports = songModel