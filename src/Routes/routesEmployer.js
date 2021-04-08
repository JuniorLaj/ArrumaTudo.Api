const {Router} = require("express");
const employerController= require("../Controllers/employerController")

require("dotenv").config();

const route = Router()

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
        res.status(200).send(response)
    }catch(error){
        res.status(404).send(error)
    }
})

module.exports = route