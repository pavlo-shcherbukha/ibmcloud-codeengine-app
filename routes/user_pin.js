var express = require('express');
var router = express.Router();

/** ==================================
 *  check user pin users 
 * req body {"userid" : "usr01", "pin": "1234567"}
 *
 * */
router.post('/', function(req, res, next) {
  console.log("1-DEBUG TEST");
  console.log("2-Prepare Response Data");
  let resp={};
  resp.userid=req.body.userid;
  resp.chkresult=true;

  
  console.log("3-SEND RESPONSE");
  res.status(200).json(resp);
});

router.get('/', function(req, res, next) {
  console.log("1-DEBUG TEST");
  console.log("2-Prepare Response Data");
  let resp={};
  resp.chkresult=true;

  
  console.log("3-SEND RESPONSE");
  res.status(200).json(resp);
});

module.exports = router;
