// on appele express
const express = require('express');
//initialisation d'express
const app = express();
//on declare le port
const port = 3000;
 
//on créé un callback
app.get('/',(request,response) => {
    response.send('Salut tous le monde!');

})
//on lance l'ecoute sur le port déclaré plus haut
app.listen(port, () => {
    console.log(`le serveur écouté à l'adresse http://localhost:${port}`);
})


