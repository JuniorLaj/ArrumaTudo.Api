const equipsController= require("../Controllers/equipsController")
const {Router} = require("express");
const { restart } = require("nodemon");
require("dotenv").config();

const route = Router()

route.get("/retornatipos",async function(req,res){
    const tipos = [
        "Peça de PC",
        "Aparelho Analógico",
        "Aparelho Eletrônico",
        "Outros"
    ]
    res.status(200).send(tipos)
})
route.get("/funcionarios/:idFuncionario",async function(req,res){
    try{
        const response = await equipsController.findEquip(req.params)
        res.status(200).send((response))
    }catch(error){
        res.status(404).send(error)
    }
})

route.get("/equipamento/cliente/:cpf_cliente",async function(req,res){
    try{
        const response = await equipsController.findEquipClient(req.params)
        res.status(200).send(response)
    }catch(error){
        res.status(404).send(error)
    }
})

route.post("/adicionarequipamento",async function(req,res){
    try{
        const response = await equipsController.addEquip(req.body)
        res.status(200).send((response))
    }catch(error){
        res.status(404).send(error)
    }
})

route.put("/editarequipamento",equipsController.updateEquip)

route.delete("/deleteEquipamento/:idEquipamento",equipsController.deleteEquip)

module.exports = route