var express = require('express');
var router = express.Router();

const deleteSingularItem = require('../BLL/dltItem');

router.get('/',async (req, res, next)=>{
    const result = await deleteSingularItem();
    console.log('deleteSingularItem-router-result:', result);
    if(result){
        res.json(result)
    }else{
        res.json({
            data: 'no return'
        })
    }
});

module.exports = router;