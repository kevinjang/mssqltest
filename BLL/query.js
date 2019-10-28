const pool = require('./getPool')
const request = require('./getRequest');
// var result = 'x';
async function query(sql){
    const p = await pool();
    const result = await request(p).query(sql);
    p.close();
    return result && result.recordsets? result.recordsets: {};;
}

module.exports = query;