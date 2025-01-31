const mongoose = require("mongoose")
require("dotenv").config()

var mongoConnection = async()=>{
try{
await mongoose.connect(process.env.connectionDB)
console.log("Connected to db successfully")
}catch(err){
console.log(err)
}

} 

module.exports = {
mongoConnection
}