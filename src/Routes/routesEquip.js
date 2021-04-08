const clientController = require("../Controllers/clientController");
const employerController= require("../Controllers/employerController")
const equipsController= require("../Controllers/equipsController")
const {Router} = require("express");
require("dotenv").config();

const route = Router()

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

module.exports = route