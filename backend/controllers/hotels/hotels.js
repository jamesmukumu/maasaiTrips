var mongoose = require("mongoose")
var {hotelModel} = require("../../models/hotels/hotels")

async function SaveHotel(req,res){
try{
    console.log(req.body)
 await hotelModel.create(req.body)

var jsonResponse = {
"message":"Hotel Saved Successfully"
}    
return res.status(200).json(jsonResponse)
}catch(err){
console.log(err)
}}  



async function filterHotel(req,res){
try{
    var {hotelID} = req.query
    console.log(hotelID)
    var pipeline =  hotelModel.aggregate()
    pipeline.match({"_id":new mongoose.Types.ObjectId(hotelID)})
    var result  = await pipeline.exec()
    return res.status(200).json({
    "message":"Hotel found",
    "data":result[0]
    })
}catch(err){
console.error(err)
}


}

module.exports = {
SaveHotel,
filterHotel
}