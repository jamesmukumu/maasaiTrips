var mongoose = require("mongoose")


var aboutHotelSchema = new mongoose.Schema({
    intro:{
    type:mongoose.SchemaTypes.String,
    required:true
    },
    introAccessibility:{
    type:mongoose.SchemaTypes.String,
    required:true
    },
    accessibility:{
    type:mongoose.SchemaTypes.String
    },
    staycationIntro:{
    type:mongoose.SchemaTypes.String,
    required:true
    },
    stayCation:{
    type:String
    },
    roomsFeatures:{
    type:mongoose.SchemaTypes.Array
    },
    CulinaryAndBarIntro:{
    type:mongoose.SchemaTypes.String
    },
    CulinaryExp:{
    type:mongoose.SchemaTypes.String
    },
    ExtraFacilitiesIntro:{
    type:mongoose.SchemaTypes.String,
    },
    ExtraFacilitiesDesc:{
    type:mongoose.SchemaTypes.String
    },
    ActivitiesIntro:{
    type:mongoose.SchemaTypes.String
    },
    Activities:{
    type:mongoose.SchemaTypes.String
    }
    
    })
var hotelSchema = new mongoose.Schema({
hotelName:{
type:mongoose.SchemaTypes.String,
required:true,
unique:true
},
hotelThumbnailPath:{
type:mongoose.SchemaTypes.String,
unique:true
},
hotelAbout:{  
type:aboutHotelSchema
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