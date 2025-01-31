var {hotelModel} = require("../../models/hotels/hotels")

async function SaveHotel(req,res){
try{
var hotelCreation = await hotelModel.create(req.body)
var jsonResponse = {
"message":"Hotel Saved Successfully"
}    
return res.status(200).json(jsonResponse)
}catch(err){
console.log(err)
}


}  


module.exports = {
SaveHotel
}