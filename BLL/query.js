const pool = require('./getPool')
const request = require('./getRequest');
// var result = 'x';
async function query(sql){
    const p = await pool();
    p.on('error',err=>{
        console.log('pool-error:', err);
        p.close();
    })
    const result = await request(p).query(sql);
    p.close();
    return result && result.recordsets? result.recordsets: {};;
}

module.exports = query;