const { Sequelize, DataTypes } = require('sequelize');
const db = require ('../../config')

const orderDetail = db.define('orderDetails', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reference: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    
    id_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

})
// console.log(orderDetail === db.orderDetailModel);
orderDetail.sync()

module.exports = orderDetail

