'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var db        = {};

if(process.env.NODE_ENV){
  const sequelize = new Sequelize('mysql://bbd76a93c13d6e:e8b581ff@us-cdbr-east-06.cleardb.net/heroku_92ae438ef95c184?reconnect=true');
}else{
  const sequelize = new Sequelize('rooms', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;