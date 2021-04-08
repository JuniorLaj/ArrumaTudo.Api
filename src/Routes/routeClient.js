const {Router} = require("express");
const clientController = require("../Controllers/clientController");
require("dotenv").config();

const route = Router()

route.get("/heathCheck",(req,res)=>{
    return res.json({
        cliente: "ok"
    })
})

route.post("/adicionarcliente",async function(req,res){
    try{
        await clientController.signClients(req.body)
        res.send({error: false}) 
    }catch(error){
        res.status(404).send(error)
    }
})

route.get("/retornaclientes",async function(req,res){
    try{
        const response = await clientController.findClients()
        res.status(200).send(response)
    } catch(error) {
        res.status(404).send(error)
    }
})

route.put("/editarcliente",clientController.updateClient)

route.delete("/deletecliente/:cpf",clientController.deleteClient)

module.exports = route