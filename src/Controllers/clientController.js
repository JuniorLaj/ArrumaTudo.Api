const repository = require("../db")

class clientController {
     
     signClients = async (params) => {
        const query = process.env.POST_SIGN_CLIENT
        return new Promise((resolve,reject) => {
            repository.query(query,[params.cpf,params.nome,params.data_nascimento,params.telefone,params.endereco])
            .then(response => {
                if(response.rows){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
     }
     findClients= async () => {
        // const connect = await Connect()
        const query = process.env.GET_CLIENTS
        return new Promise((resolve,reject) => {
            repository.query(query).then(response => {
                if(response.rows){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
    }

    updateClient = async function(req,res){
        const params = req.body
        console.log(params)
        const query = process.env.UPDATE_CLIENT
        try{
            await repository.query(query,[params.nome,params.data_nascimento,params.telefone,params.endereco,params.cpf])
            res.send({error: false}) 
        }catch(error){
            res.status(500).send({error: true, message: "Houve algum problema ao editar o cliente."})
        }   
    }

    deleteClient= async function(req,res){
        // const connect = await Connect()
        const query = process.env.DELETE_CLIENT
        try {
            await repository.query(query,[req.params.cpf])
            res.send({error: false})
        }catch(error){
            res.status(500).send({error: true, message:'Houve algum problema ao excluir o cliente.' })
        }
    }
}

module.exports = new clientController()