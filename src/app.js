const express = require("express")
const routesClient = require("./Routes/routeClient")
const routesEmployer = require("./Routes/routesEmployer")
const routesEquip = require("./Routes/routesEquip")

const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.use("/v1/client",routesClient)
app.use("/v1/employer",routesEmployer)
app.use("/v1/equip",routesEquip)


const server = require("http").createServer(app)



server.listen(8080, ()=> {
    console.log("server run port 8080...")
})

