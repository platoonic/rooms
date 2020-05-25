module.exports = (sequelize, Sequelize) => {
	return sequelize.define('Room', {name:
		{type: Sequelize.STRING,
		allowNull: false 
		}},
		{
			freezeTableName: true
		})
}