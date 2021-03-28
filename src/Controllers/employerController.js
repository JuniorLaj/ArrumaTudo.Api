const repository = require("../db")

module.exports ={
    async findEmployer(params) {
        // const connect = await Connect()
        const query = process.env.GET_EMPLOYERS_MANNAGER;
        
        return new Promise((resolve,reject) => {
            repository.query(query,[params.cpf]).then(response => {
                if(response.rows){
                    resolve(response.rows)
                }else{
                    reject(response.error)
                }
            })
        })
    }
}
