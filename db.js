/*
	
	DB Configuration file

*/
const Sequelize = require('sequelize');

const sequelize = new Sequelize('rooms', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql'
});


module.exports = sequelize;