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
        const responseCPF = await clientController.verifyCpfClient(req.body)
        if(responseCPF.rowCount){
            res.status(404).send({
                error: true,
                message:"Já existe um cliente com este CPF."
            })
        }else{
             await clientController.addClients(req.body)
            res.send({error: false}) 
        }
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

route.delete("/deletecliente/:idCliente",clientController.deleteClient)

module.exports = route