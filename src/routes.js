const {Router} = require("express")
const employerController= require("./Controllers/employerController")
const equipsController= require("./Controllers/equipsController")
require("dotenv").config();

const route = Router()

route.get("/heathCheck",(req,res)=>{
    return res.json({
        cliente: "ok"
    })
})

route.get("/funcionarios/:cpf",async function (req,res) {
    try{
        const response = await employerController.findEmployer(req.params)
        res.status(200).send((response))
    }catch(error){
        res.status(404).send(error)
    }

})

route.get("/equipamento/:cpf_funcionario",async function(req,res){
    try{
        console.log(req.params)
        const response = await equipsController.findEquip(req.params.cpf_funcionario)
        res.status(200).send((response))
    }catch(error){
        res.status(404).send(error)
    }
})

module.exports = route