 async function connectBD(){
    if(global.connection)
        return global.connection.connect()
        
    const { Pool } = require('pg');
    const pool = new Pool({
        user: CONNECTION_DB.USER,
        host: CONNECTION_DB.HOST,
        database: CONNECTION_DB.DATABASE,
        password: CONNECTION_DB.PASSWORD,
        port: CONNECTION_DB.PORT,
        max: Infinity,
    });
    global.connection = pool
    return await global.connection.connect()
}

class Repository {
    query = async (queryText,params=[]) => {
        try{
            await connectBD()
            const connect =  await global.connection.connect()
            const response = await connect.query(queryText,params)
            connect.end()
            return response
        }catch(error){
            console.log("Error query...")
        }
    }
}

module.exports = new Repository()


const CONNECTION_DB = {
    USER: 'postgres',
    HOST:'localhost',
    DATABASE:'ARRUMATUDOBD',
    PASSWORD: '1surfista',
    PORT: '5432',
}