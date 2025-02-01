var router = require("express").Router()
var {SaveHotel,filterHotel} = require("../controllers/hotels/hotels")


router.post("/save/hotel",SaveHotel)
router.get("/filter/hotel",filterHotel)

module.exports = router