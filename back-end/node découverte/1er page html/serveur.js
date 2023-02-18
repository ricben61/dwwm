//On appele express
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');


//initialisation d'express
const app = express();
//on declare le port
const port = 3000;

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
// On créé une route
app.get('/', (request, response) => {
    response.render('index');
    
})
app.get('/Une-autre-page', (request, response) => {
    response.render('Une-autre-page')
})

//on lance l'ecoute sur le port déclaré plus haut
app.listen(port, () => {
    console.log(`le serveur ecoute à l'adresse http://localhost:${port}`);
})

