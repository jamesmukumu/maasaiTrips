var app = require("express")()
require("dotenv").config()
var {mongoConnection} = require("./db/db")
var bodyParser = require("body-parser")
var cors = require("cors")
mongoConnection()
 
..
app.use(bodyParser())
app.use(cors())
app.use(require("./router/router"))
app.listen(process.env.PORT,()=>{
console.log(`server listening at port ${process.env.PORT}`)
})