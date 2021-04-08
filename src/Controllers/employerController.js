const repository = require("../db")

class employerController {

    findEmployer = async (params) => {
        const query = process.env.GET_EMPLOYERS_MANNAGER
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


    loginEmployer = async (params)=> {
        // const connect = await Connect()
        const query = process.env.POST_LOGIN_EMPLOYER;
        
        return new Promise((resolve,reject) => {
            repository.query(query,[params.email,params.password]).then(response => {
                if(response.rows){
                    resolve(response.rows[0])
                }else{
                    reject(response.error)
                }
            })
        })
    }
}

module.exports= new employerController()