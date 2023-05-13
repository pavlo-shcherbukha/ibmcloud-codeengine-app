var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("1-Health Rourer");
  

  let result={"ver": 2, "text":"Integration with WA"}
  console.log("3-SEND RESPONSE");
  res.status(200).json(result);
});

module.exports = router;
