const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config');
const Category = require('./categoryModel')


const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
      },


    name: {
        type: DataTypes.STRING,
        allowNull: false
      },

    description: {
        type: DataTypes.STRING,
        allowNull: false
      }, 

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

    isBest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },  
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
      }, 
       
    

})

Category.hasMany(Products)
Products.belongsTo(Category)


Products.sync()

module.exports = Products


