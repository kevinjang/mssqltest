const sql = require('mssql');
const config ={
    user: 'sa',
    password: 'tingshuo768',
    server: 'localhost',
    database: 'KSNL',
    port: 1434
  }
// const pools = new sql.ConnectionPool(config).connect();
// var request = null;
// pools.then(p=>{
//     request = p.request();
//     return request;
// });
function request(pool){

    var request = new sql.Request(pool);
    return request;
}

module.exports = request;