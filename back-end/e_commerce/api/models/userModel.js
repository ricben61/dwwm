const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../../config');
const Etre = require('./etreModel')
const Role = require('./roleModel')
const User = db.define('users', {
  // modeles pour la création de la bdd sql

  id: {type: DataTypes.INTEGER,allowNull: false,autoIncrement: true,primaryKey: true,},
  email: {type: DataTypes.STRING, allowNull: false,},
  password: {type: DataTypes.STRING,allowNull: false,},
  firstname: {type: DataTypes.STRING,allowNull: false,},
  lastname: {type: DataTypes.STRING,allowNull: false,},
  phone: {type: DataTypes.STRING,allowNull: false,},
}, {
  hooks: {
    beforeCreate: (User) => {
      {User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : "";}
    }
  }
})
User.belongsToMany(Role, { through: Etre })
Role.belongsToMany(User, { through: Etre })

db.sync();

module.exports = User;