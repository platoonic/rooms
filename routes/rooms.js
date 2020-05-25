var express = require('express');
var router = express.Router();

let response = 
{
	name: 'Peter',
};

router.post('/', function(req, res, next){
	res.json(response);
});

module.exports = router;
