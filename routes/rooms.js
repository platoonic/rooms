var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var queryString = require('querystring');
var url = require('url');

const app = express();
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({ 
  extended: true
})); 


app.use(express.json());  
app.use(express.urlencoded())

router.post('/', function(req, res, next)
{
	res.send("correct");
});

router.post('/create', function(req, res){
	models.Room.create({
		name: req.body.name
	}).then(function()
	{
		res.json('Done');
	})
});

router.delete('/', function(req, res)
{
	let roomNo = req.query.roomId;
	models.Room.destroy({
	 where: {
	    id: roomNo
	 }
	}).then(() => {
	  console.log("Done");
	  res.json('Done')
});
})


router.get('/', function(req, res, next)
{
	models.Room.findAll().then(Rooms => {
		console.log(Rooms)
	})
});

module.exports = router;