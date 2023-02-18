const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config');


const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
      },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
      },

    userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    userAdress: {
        type: DataTypes.STRING,
        allowNull: false
      },
    carrier: {
        type: DataTypes.STRING,
        allowNull: false
      },
    carrierPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },  
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
    totalWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
      },       
      
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    id_carrier: {
        type: DataTypes.INTEGER,
        allowNull: false
      },   

})

Order.sync()

module.exports = Order

