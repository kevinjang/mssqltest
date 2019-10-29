// const getTransaction = require('./getTransaction');
const query = require('./query');
// const sql = require('mssql');
const pool = require('./getPool');

var tableName = "[Brc_BPM_Oc].[dbo].[Brc_OC_UserBaseInfo]";
async function deleteSingularItem() {
    var sql = `select top 1 * from ${tableName} where userAD = 'cofco\\无'  and recordstatus <> 1`;
    const result = await query(sql);

    if (Array.isArray(result) && result.length > 0) {
        // 
        const item = result[0][0];// result-{recordsets:[], recordset:{},...}
        // result[0]-recordsets; result[0][0]-first data item
        const id = item.Id;

        // console.log('userinfoitem', item);

        sql = `delete from ${tableName} where Id = '${id}' and recordstatus <> 1`;
        // console.log('dltItem-transaction:', transaction);

        const p = await pool();
        p.on('error',err=>{
            if(err){
                console.log('pool-error:', err);
                p.close();
            }
        })
        const transaction = await p.transaction();
        transaction.begin((err) => {
            if (err) {
                console.log('transaction-begin-error:', err);
                transaction.rollback(err=>{
                    console.log('transaction-rollback-error:', err);
                });
            }

            console.log('delete-sql:', sql);
            const request = transaction.request();
            request.query(sql, (err, result) => {
                if (err) {
                    console.log('transaction-request-query-error:', err);
                    transaction.rollback(errx => {
                        console.log('transaction-rollback-error:', errx);
                    });
                    return;
                }

                console.log('transaction-request-query-result:', result);
                if (result && result.rowsAffected > 0) {
                    transaction.commit(errx => {
                        if (errx)
                            console.log('transaction-commit-error:', errx);
                        else
                            return true;
                    });
                }
            });
        });

        // const transactionX = getTransaction();
        // // console.log('transactionX:', transactionX);
        // transactionX.then(transaction => {
        //     // console.log('transaction:', transaction);
        //     transaction.begin((err) => {
        //         if (err) {
        //             console.log('transaction-begin-error:', err);
        //             transaction.rollback();
        //         }

        //         console.log('delete-sql:', sql);
        //         const request = transaction.request();
        //         request.query(sql, (err, result) => {
        //             if (err) {
        //                 console.log('transaction-request-query-error:', err);
        //                 transaction.rollback(errx => {
        //                     console.log('transaction-rollback-error:', errx);
        //                 });
        //                 return;
        //             }

        //             // console.log('transaction-request-query-result:', result);
        //             if (result && result.rowsAffected > 0) {
        //                 transaction.commit(errx => {
        //                     if (errx)
        //                         console.log('transaction-commit-error:', errx);
        //                     else
        //                         return true;
        //                 });
        //             }
        //         });
        //     });
        // }).catch(err => {
        //     console.log('transactionX-error:', err);
        // });
    }
}

module.exports = deleteSingularItem;