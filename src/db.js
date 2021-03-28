async function connectBD(){
    const connectionString = process.env.CONNECTION_STRING;
    if (global.connection)
        return await global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: connectionString
    });
    global.connection = pool
    return await global.connection.connect()
}

class Repository {
    query = async (queryText,params=[]) => {
        const connect = await connectBD()
        const response = await connect.query(queryText,params)
        return response
    }
}

module.exports = new Repository()
