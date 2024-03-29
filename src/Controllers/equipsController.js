const repository = require("../db")

class equipsController {

    findEquip = async (params)=> {

       return new Promise((resolve,reject) => {
           repository.query(GET_EQUIPS_EMPLOYER,[params.idFuncionario]).then(response => {
               if(response.rows){
                   resolve(response.rows)
               }else{
                   reject(response.error)
               }
           })
       })
   }

    findEquipClient = async (params) => {
        return new Promise((resolve,reject) => {
            repository.query(GET_EQUIPS_CLIENT,[params.cpf_cliente]).then(response => {
                if(response.rows){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
    }

    addEquip = async (params) => {
        return new Promise((resolve,reject) => {
            repository.query(POST_ADD_EQUIP,[params.tipo,params.modelo,params.defeito,
                                params.idCliente,params.idFuncionario]).then(response => {
                if(response.rowCount){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
    }

    updateEquip = async function(req,res){
        const params = req.body
        try{
            await repository.query(UPDATE_EQUIP,[params.modelo,params.defeito,params.status, params.idEquipamento])
            res.send({error: false}) 
        }catch(error){
            res.status(500).send({error: true, message: "Houve algum problema ao editar o Serviço."})
        }   
    }

    deleteEquip = async function(req,res){
        try {
            await repository.query(DELETE_EQUIP,[req.params.idEquipamento])
            res.send({error: false})
        }catch(error){
            res.status(500).send({error: true, message:'Houve algum problema ao excluir o equipamento.' })
        }
    }
}

GET_EQUIPS_EMPLOYER =
"SELECT"+
"   id_equipamento AS idEquipamento,"+
"   tipo,"+
"   modelo,"+
"   defeito,"+
"   data_entrada AS dataEntrada,"+
"   status "+
"FROM EQUIPAMENTO "+
"WHERE"+
"   id_func = $1 "+
"ORDER BY dataEntrada "


GET_EQUIPS_CLIENT = 
"SELECT "+
"   E.id_equipamento AS idEquipamento,"+
"   E.tipo,"+
"   E.modelo,"+
"   E.data_entrada AS dataEntrada,"+
"   E.status "+
"FROM EQUIPAMENTO E,"+ 
"   (SELECT "+
"       id_cliente "+
"    FROM CLIENTE "+
"    WHERE "+
"       cpf = $1 ) C "+
"WHERE"+
"   C.id_cliente = E.id_cliente "+
"ORDER BY dataEntrada DESC "

POST_ADD_EQUIP =
"INSERT INTO EQUIPAMENTO "+
"(tipo, modelo, defeito, data_entrada,id_cliente, id_func) "+
"VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)"

UPDATE_EQUIP = 
"UPDATE EQUIPAMENTO "+
"SET"+
"   modelo = $1,"+
"   defeito = $2,"+
"   status= $3 "+
"WHERE"+
"   id_equipamento = $4"

DELETE_EQUIP = 
"DELETE "+
"FROM EQUIPAMENTO "+
"WHERE"+
"   id_equipamento = $1"

module.exports = new equipsController()