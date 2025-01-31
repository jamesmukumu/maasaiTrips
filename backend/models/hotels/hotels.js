var mongoose = require("mongoose")

var hotelSchema = new mongoose.Schema({
hotelName:{
type:mongoose.SchemaTypes.String,
required:true,
unique:true
},
hotelAbout:{
type:mongoose.SchemaTypes.String,
required:true,
},
hotelThumbnailPath:{
type:mongoose.SchemaTypes.String,
unique:true
},
hotelPhotos:{
type:mongoose.SchemaTypes.Array,
required:true
},
longitude:{
type:mongoose.SchemaTypes.Number
},

latitude:{
type:mongoose.SchemaTypes.Number
}
})


var hotelModel = mongoose.model("hotelModel",hotelSchema,"hotels")
module.exports = {
hotelModel
}