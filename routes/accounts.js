var express = require('express');
var accsrvc = require('../controllers/accsrvc')
var apperror = require('../error/appError');
var router = express.Router();

function log (msg, label){
    if( typeof label === "undefined" || label === null || label === ''){
        label = 'CustomerService' 
    }
    let dtm = Date.now();
    let dt= new Date(dtm)
    let dtms=dt.toISOString()
    let logmsg={"timestamp": dtms, "message": msg, "label": label}
    console.log( JSON.stringify(logmsg)  )
}



router.get('/', function(req, res, next) {
    let label='accounts.get.all'
    let msg='start'
    log(msg, label);

    let resp={};
    const AccSrvc= new accsrvc.AccountService('account')
    AccSrvc.accountlist()
    .then(result=>{
        msg="Return result: " + JSON.stringify(result)
        log(msg, label);
        return res.status(200).json( result );
    })
    .catch (err=>{
        msg="Return result: " + JSON.stringify(err.message)
        log(msg, label);
        return res.status(405).json(  { "message": err.message} );

    });
});

router.get('/:account', function(req, res, next) {
    let label='accounts.get.account'
    let msg='start'
    log(msg, label);

    let resp={};
    const CustSrvc= new custsrvc.CustomerService('customerbycif')
    cif=req.params.cif;
    //resp.chkresult=true;
    CustSrvc.findbycif(cif)
    .then(result=>{
        msg="Return result: " + JSON.stringify(result)
        log(msg, label);
        return res.status(200).json( result );
    })
    .catch (err=>{
        msg="Return result: " + JSON.stringify(err.message)
        log(msg, label);

        return res.status(405).json(  { "message": err.message} );

    });
});




module.exports = router;
