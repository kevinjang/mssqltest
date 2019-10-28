var express = require('express');
var router = express.Router();
// const sql = require('mssql');

const query = require('../BLL/query')

/* GET home page. */
router.get('/',async function(req, res, next) {
 const {userAD} = req.query;

  var tableName = '[KSNL].[dbo].[KE_UserBaseInfo]'
  var sql = `select * from ${tableName} where userAD = '${userAD}' and recordstatus = 1; select 42 as num`;
  // const v = await query(sql);

  // const qu = new QueryUtil();
  const v = await query(sql);
  console.log('router-v:', v);

  res.json(v);
});

module.exports = router;
