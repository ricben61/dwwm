const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '', {
    host: 'localhost',
    dialect:  'mysql' ,
    // query:{raw:true},
    logging:true,
  });


  module.exports = sequelize