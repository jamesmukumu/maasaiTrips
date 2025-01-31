var router = require("express").Router()
var {SaveHotel} = require("../controllers/hotels/hotels")


router.post("/save/hotel",SaveHotel)

module.exports = router