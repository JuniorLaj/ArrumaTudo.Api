const repository = require("../db")

module.exports ={
    async findEquip(params) {
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