const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

const server = require("http").createServer(app)
app.use("/v1",routes)


server.listen(8080, ()=> {
    console.log("server run port 8080...")
})

