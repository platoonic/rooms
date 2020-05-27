const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function(req, res, next){
	passport.authenticate('local', {session: false}, (err, user, info) => {
		if(err || !user){
			res.status(400).json({
				status:'Bad Request',
				code:400,
				data: { message: 'Wrong Credentials'} 
			});
		}
		req.login(user, {session: false}, (error) => {
			if(error){
				res.status(400).json({ data: { message: 'an error occured' }});
			}
			const token = jwt.sign(user.toJSON(), 'secret');
			res.status(200).json({
				status:'OK',
				code:200,
				data: { message: 'Logged in succesfully', token: token, id: user.id} 
			});
		});
	})(req, res);
});

module.exports = router;