const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorsHandler')


require('dotenv/config');


app.use(cors());
app.options('*', cors() )

const productsRoutes = require ('./routers/products');
const categoriesRoutes = require ('./routers/categories');
const usersRoutes = require('./routers/users')
const ordersRoutes = require('./routers/orders');

const api = process.env.API_URL

// Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

// Routers
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes)

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'boutique'
})
.then( ()=>{
    console.log("Connexion à la BDD avec succès");
} )
.catch( (err) =>{
    console.log(err);
})

app.listen(3000, () =>{
    console.log(api); // Pour tester si ma route est fonctionnelle
    console.log("Le serveur est en cours d'exécution http://localhost:3000 ");
})