const express = require('express');
const Sequelize = require('sequelize');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 5000;
const MomentHandler = require("handlebars.moment");
const router = require ('./api/router');
const Handlebars = require("handlebars");
const db = require('./config');
const methodOverride = require('method-override');


try {
     db.authenticate();
    console.log('tu es bien connecter mon boss.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }));
  // Precise l'extention des vue qui sera utilisé
app.set('view engine', 'hbs');
  // Precise le dossier ou sont les vues 
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use(methodOverride('_method'));

// const inscription = require('./api/controllers/inscription');
app.use("/",router)
MomentHandler.registerHelpers(Handlebars);
//on lance l'ecoute sur le port déclaré plus haut
app.listen(port, () => {
console.log(`le serveur ecoute à l'adresse http://localhost:${port}`);
})