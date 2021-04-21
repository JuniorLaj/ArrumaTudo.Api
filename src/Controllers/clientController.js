const repository = require("../db")

class clientController {
     verifyCpfClient = async (params) => {
         return new Promise((resolve,reject) => {
            repository.query(("SELECT * FROM CLIENTE WHERE cpf = $1"),[params.cpf])
            .then(response => {
               resolve(response)
         }).catch(error => {
             reject(error)
         })
    })}

     addClients = async (params) => {

        return new Promise((resolve,reject) => {
            repository.query(POST_ADD_CLIENT,[params.cpf,params.nome,params.data_nascimento,params.telefone,
                params.rua,params.numero,params.bairro,params.cidade,params.estado])
            .then(response => {
                if(response.rowCount){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
     }

     findClients= async () => {
        return new Promise((resolve,reject) => {
            repository.query(GET_CLIENTS).then(response => {
                if(response.rowCount){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
    }

    updateClient = async function(req,res){
        const params = req.body
        try{
            await repository.query(UPDATE_CLIENT,[params.nome,params.telefone,
                params.rua,params.numero,params.bairro,params.cidade,params.estado,
                params.idCliente])
            res.send({error: false}) 
        }catch(error){
            res.status(500).send({error: true, message: "Houve algum problema ao editar o cliente."})
        }   
    }

    deleteClient= async function(req,res){
        try {
            await repository.query(DELETE_CLIENT,[req.params.idCliente])
            res.send({error: false})
        }catch(error){
            res.status(500).send({error: true, message:'Houve algum problema ao excluir o cliente.' })
        }
    }
    
}

POST_ADD_CLIENT =
"INSERT INTO CLIENTE "+
"(cpf,nome,data_nascimento,data_inicio,telefone,rua,numero,bairro,cidade,estado) "+
"VALUES ($1, $2, $3, CURRENT_DATE, $4, $5,$6,$7,$8,$9)"

GET_CLIENTS =
"SELECT "+
"   id_cliente AS idCliente,"+
"   cpf,"+
"   nome,"+
"   rua,"+
"   numero,"+
"   bairro,"+
"   cidade,"+
"   estado,"+
"   telefone,"+
"   data_nascimento AS dataNascimento,"+
"   data_inicio AS dataInicio "+
"FROM CLIENTE "+
"ORDER BY dataInicio"

UPDATE_CLIENT = 
"UPDATE CLIENTE "+
"SET"+
"   nome = $1,"+
"   telefone= $2,"+
"   rua= $3,"+
"   numero= $4,"+
"   bairro= $5,"+
"   cidade= $6,"+
"   estado= $7 "+
"WHERE"+
"  id_cliente = $8"

DELETE_CLIENT = 
"DELETE "+
"FROM CLIENTE "+
"WHERE"+
"   id_cliente = $1"

module.exports = new clientController()