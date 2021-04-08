const repository = require("../db")

class equipsController {

    findEquipClient= (params) => {
       const query = process.env.GET_EQUIPS_CLIENT
       return new Promise((resolve,reject) => {
           repository.query(query,[params]).then(response => {
               if(response.rows){
                   resolve(response.rows)
               }else{
                   reject(response.error)
               }
           })
       })
   }
   
   
   
    findEquip = async (params)=> {
       // const connect = await Connect()
       const query = process.env.GET_EQUIPS_EMPLOYER
       
       return new Promise((resolve,reject) => {
           repository.query(query,[params]).then(response => {
               if(response.rows){
                   resolve(response.rows)
               }else{
                   reject(response.error)
               }
           })
       })
   }
}

module.exports=new equipsController()