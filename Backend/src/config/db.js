const mongoose = require("mongoose")

async function db(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("database connected")
}

module.exports = db