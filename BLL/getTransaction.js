const pool = require('./getPool');
const sql = require('mssql');

async function getTransaction(){
    const p = await pool();
    p.on('error',err=>{
        console.log('gettransaction-pool-error:', err);
        p.close();
    });

    const transaction = p.transaction();
    console.log('getTransaction-transaction:', transaction);
    return transaction; //new sql.Transaction(p);
}
/*
const p = new sql.ConnectionPool({
    // user: 'sa',
    // password: 'tingshuo768',
    // server: 'localhost',
    // database: 'KSNL',
    // port: 1434
    user: 'sa',
    password: 'cofco506',
    server: '10.6.5.17',
    database: 'CofcoFoods.BPM.Data'
}).connect();//await pool();
p.on('error', err => {
    console.log('gettransaction-pool-error:', err);
    p.close();
});

const transaction = p.transaction();
console.log('getTransaction-transaction:', transaction);
*/
module.exports = getTransaction;
// module.exports = transaction;