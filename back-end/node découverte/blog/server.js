//On appele express
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const router = require ('./api/router');
//initialisation d'express
const app = express();
//on declare le port
const port = 3000;
require("./api/models/db.config")
const methodOverride = require('method-override');
const users = require('./api/models/users');
const LocalStorage = require('node-localstorage')
const cookieParser = require("cookie-parser");
const MomentHandler = require("handlebars.moment");
const Handlebars = require("handlebars");
const jwt = require('jsonwebtoken');
const checkUser = require('./api/middleware/checkUser')



// Handlebars
// Precise a l'engine quel extension nous allons utilisé. Defintit ensuite le layout utilisé
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }));
// Precise l'extention des vue qui sera utilisé
app.set('view engine', 'hbs');
// Precise le dossier ou sont les vues 
app.set('views', './views');

// On crée le lien vers les fichier bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/public', express.static(path.join(__dirname, 'assets')))
app.use(cookieParser());



Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  })





app.use(checkUser)



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));



MomentHandler.registerHelpers(Handlebars);









// const inscription = require('./api/controllers/inscription');
app.use("/",router)

//on lance l'ecoute sur le port déclaré plus haut
app.listen(port, () => {
console.log(`le serveur ecoute à l'adresse http://localhost:${port}`);
})

