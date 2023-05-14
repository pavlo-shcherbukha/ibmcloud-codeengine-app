var express = require('express');
var router = express.Router();
var swagger = require("../api/openapi.json")

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

/* GET users listing. */
router.get('/', function(req, res, next) {

    log('render swagger.json')
    res.status(200).json(swagger);
});

module.exports = router;
