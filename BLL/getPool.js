const sql = require('mssql');
const config = {
    user: 'sa',
    password: 'tingshuo768',
    server: 'localhost',
    database: 'KSNL',
    port: 1434
}

// let pools  ;

// async function pool() {
//     const pools = await sql.connect(config);
//     return pools;
// };

async function pool(){
    const pools = new sql.ConnectionPool(config).connect();
    return pools;
}



module.exports = pool;