const {Router, response} = require("express");
const employerController= require("../Controllers/employerController")

require("dotenv").config();

const route = Router()

route.post("/adicionarfuncionario",async function(req,res){
    try{
        const responseCpf = await employerController.verifyCpfFunc(req.body)
        const responseEmail = await employerController.verifyEmailFunc(req.body)
        if(responseCpf.rowCount){
            res.status(404).send({
                error: true,
                message:"Já existe um funcionário com este CPF."
            })
        }else if(responseEmail.rowCount){
            res.status(404).send({
                error: true,
                message:"Já existe um funcionário com este email."
            })
        }else{
            await employerController.addEmployer(req.body)
            res.send({error: false}) 
        }
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


route.get("/funcionarios/:idGerente",async function (req,res) {
    try{
        const response = await employerController.findEmployer(req.params)
        res.status(200).send(response)
    }catch(error){
        res.status(404).send(error)
    }
})

route.put("/editarfuncionario",employerController.updateEmployer)

route.delete("/deletarfuncionario/:idFuncionario",employerController.deleteEmployer)


module.exports = route