const repository = require("../db")

class employerController {
    verifyCpfFunc = async (params) => {
        return new Promise((resolve,reject) => {
           repository.query(("SELECT * FROM FUNCIONARIO WHERE cpf = $1"),[params.cpf])
           .then(response => {
              resolve(response)
        }).catch(error => {
            reject(error)
        })
   })}

   verifyEmailFunc = async (params) => {
        return new Promise((resolve,reject) => {
        repository.query(("SELECT * FROM FUNCIONARIO WHERE email = $1"),[params.email])
        .then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })}

    addEmployer = async (params) => {
        return new Promise((resolve,reject) => {
            repository.query(POST_ADD_EMPLOYER,[params.cpf,params.nome,
                params.rua,params.numero,params.bairro,params.cidade,params.estado,params.telefone,
                params.dataNascimento, params.email, params.senha, params.salario, params.idGerente])
            .then(response => {
                if(response.rows){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
     }

    findEmployer = async (params) => {
        return new Promise((resolve,reject) => {
            repository.query(GET_EMPLOYERS_MANNAGER,[params.idGerente]).then(response => {
                if(response.rows){
                    resolve(response.rows)
                }else{

                    reject(response.error)
                }
            })
        })
    }

    loginEmployer = async (params)=> {
        return new Promise((resolve,reject) => {
            repository.query(POST_LOGIN_EMPLOYER,[params.email,params.password]).then(response => {
                if(response.rows){
                    resolve(response.rows[0])
                }else{
                    reject(response.error)
                }
            })
        })
    }

    updateEmployer = async function(req,res){
        const params = req.body
        try{
            await repository.query(UPDATE_EMPLOYER,[params.nome,
                params.rua,params.numero,params.bairro,params.cidade,params.estado,
                params.telefone, params.salario, params.idFuncionario])
            res.send({error: false}) 
        }catch(error){
            res.status(500).send({error: true, message: "Houve algum problema ao editar o Funcionário."})
        }   
    }

    deleteEmployer = async function(req,res){
        try {
            await repository.query(DELETE_EMPLOYER,[req.params.idFuncionario])
            res.send({error: false})
        }catch(error){
            res.status(500).send({error: true, message:'Houve algum problema ao excluir o funcionário.' })
        }
    }

}


POST_ADD_EMPLOYER =
"INSERT INTO FUNCIONARIO "+
"(cpf,nome,rua,numero,bairro,cidade,estado,telefone,data_nascimento,data_inicio,email,pass,salario,id_gerente) "+
"VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_DATE, $10, $11, $12, $13)"

GET_EMPLOYERS_MANNAGER = 
"SELECT "+
"   id_func as idFuncionario,"+
"   nome,"+
"   rua,"+
"   numero,"+
"   bairro,"+
"   cidade,"+
"   estado,"+
"   telefone,"+
"   data_nascimento AS dataNascimento,"+
"   salario "+
"FROM FUNCIONARIO "+
"WHERE "+
"   id_gerente = $1 AND id_gerente <> id_func"

POST_LOGIN_EMPLOYER = 
"SELECT "+
"   id_func AS idFuncionario,"+
"   nome,"+
"   id_gerente AS idGerente "+
"FROM FUNCIONARIO "+
"WHERE"+
"   email = $1"+
"   AND pass = $2";

UPDATE_EMPLOYER = 
"UPDATE FUNCIONARIO "+
"SET"+
"   nome = $1,"+
"   rua= $2,"+
"   numero= $3,"+
"   bairro= $4,"+
"   cidade= $5,"+
"   estado= $6,"+
"   telefone = $7,"+
"   salario = $8 "+
"WHERE"+
"   id_func = $9"

DELETE_EMPLOYER = 
"DELETE "+
"FROM FUNCIONARIO "+
"WHERE"+
"   id_func = $1"

module.exports= new employerController()