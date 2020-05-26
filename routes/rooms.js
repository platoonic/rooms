var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/create', function(req, res) {
	models.Room.create({
		name: req.body.name,
		room_Code: makeid(10),
		people_Count: 1,
		UserId: req.body.creatorId
	})
	.then(function(room) {
		res.status(200).json({ status:'OK', code:200, data: { message: 'Room was created!', roomCode: room.room_Code} });
	})
	.catch((error) => {
		res.status(400).json({ status:'Bad Request', code:400, data: { message: 'Error Occured: ' + error} });
	});
});

router.delete('delete/:roomId', function(req, res)
{
	let roomNo = req.params.roomId;
	models.Room.destroy({
	 where: {
	    id: roomNo
	 }
	}).then(() => {
	  res.status(200).json({ status:'OK', code:200, data: { message: 'Room was Deleted!' } });
}).catch((error) => {
	res.status(400).json({status:'Bad Request', code: 400, data: {message: 'Error Deleting Room' }})
});
})


router.post('/join/:room_Code', function(req, res) {
	let recievedCode = req.params.room_Code;
	models.Room.findOne({ where:{ room_Code: recievedCode }})
	.then(theRoom => {
		let number = theRoom.dataValues.people_Count;
		console.log(number);
		if(number == 1){
			models.Room.update( {
				people_Count : 2},{ where: {id : theRoom.dataValues.id}
			})
			.success(res.status(200).json({ status:'OK', code:200, data: { message: 'Room joined successfully' }}))
			.error(error => {
				res.status(400).json({status:'Bad Request', code: 400, data: {message: 'Room found but failed to update!' }});
			})
			
		}
		else {
			res.status(400).json({status:'Bad Request', code: 400, data: {message: 'Room maximum number exceded!' }})
		}
	})
	.catch((error) => {
			res.status(400).json({status:'Bad Request', code: 400, data: {message: 'Error joining room!'+error }})
	})

});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}



router.get('/', function(req, res, next) {
	models.Room.findAll().then(Rooms => {
		console.log(Rooms)
		res.json("rooms retreived");
	})
	.catch((error) => {
	res.status(400).json({status:'Bad Request', code: 400, data: {message: 'Rooms Error' }})
});
});

module.exports = router;