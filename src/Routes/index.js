const {Router} = require("express");
const clientController = require("../Controllers/clientController");
const employerController= require("../Controllers/employerController")
const equipsController= require("../Controllers/equipsController")
require("dotenv").config();
const route = Router()

route.get("/heathCheck",(req,res)=>{
    return res.json({
        cliente: "ok"
    })
})


route.get("/retornaclientes",async function(req,res){
    try{
        const response = await clientController.findClients()
        console.log(response)
        res.status(200).send(response)
    } catch(error) {
        res.status(404).send(error)
    }
})

route.delete("/deletecliente/:cpf",async function(req,res){
        try{
            console.log(req.params.cpf)
            const response = await clientController.deleteClient(req.params.cpf)
            const message = "Cliente "+req.body.cpf+"Excluido com sucesso"
            res.status(200).send(message)
        }catch(error){
            res.status(404).send(error)
        }
})


route.get("/equipamento/:cpf_funcionario",async function(req,res){
    try{
        const response = await equipsController.findEquip(req.params.cpf_funcionario)
        res.status(200).send((response))
    }catch(error){
        res.status(404).send(error)
    }
})

route.get("/equipamento/cliente/:cpf_cliente",async function(req,res){
    try{
        const response = await equipsController.findEquipClient(req.params.cpf_cliente)
        res.status(200).send((response))
    }catch(error){
        res.status(404).send(error)
    }
})


route.post("/auth/login",async function(req,res){
    try{
        const response = await employerController.loginEmployer(req.body)

        const responseData = {
            user: {
                data: response
            }
        }
        res.status(200).send(responseData)
    }catch(error){
        res.status(404).send(error)
    }
})


route.get("/funcionarios/:cpf",async function (req,res) {
    try{
        const response = await employerController.findEmployer(req.params)
        console.log(response)
        res.status(200).send(response)
    }catch(error){
        console.log(error)

        res.status(404).send(error)
    }
})

module.exports = route