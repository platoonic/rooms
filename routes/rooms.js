var express = require('express');
var router = express.Router();
var models = require('../models');

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