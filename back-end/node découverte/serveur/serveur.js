//on indique qu'on utilise le systeme http de node
const http = require('http');

//on indique l'adresse ip sur laquelle on veux que l'application soit dirigé
const hostname ='127.0.0.1';
//on indique le port sur laquelle on veux que l'application soit dirigé
const port = 3000;

//on crée le serveur
const server = http.createServer(
    //on crée une fonction qui prendra en parametre "response"
    (request, response) => {
        //on applique des parametres a response: 
        //le code qu'il va renvoyer 
        response.statusCode = 200;
        // on indique quel type de contenu on envoi
        response.setHeader('Content-type', 'text/plain');
        //on indique que le dernier element est une chaine de caractere qu'il affichera. on peux precisé l'encodage
        response.end('hello world!', 'utf-8');
    });

    //on indique que le la constante server sera ecouté sur un ip et un port.
    server.listen(
        port, 
        hostname, 
        //on ajoute uen fonction pour affiché dans la console ou est  accessible l'application.
        () => {
            console.log(`server running at http://${hostname}:${port}`);
        })