const express   = require('express');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
	//Users Model Schema
	let user = sequelize.define('User', {
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
	},{
		freezeTableName: true
	});
	return user;
}