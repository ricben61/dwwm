const { DataTypes } = require('sequelize');
const db = require('../../config');

const Carriers = db.define('carriers', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    minWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    maxWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

})

Carriers.sync() // permet de créer une base de donnée si elle n'existe pas

module.exports = Carriers