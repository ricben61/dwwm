const recetteCollection = require('../models/recette');
const jwt = require('jsonwebtoken');

module.exports = {
    get: async (req, res) => {

        const token = req.cookies.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        const recettesData = await recetteCollection.find({"userId": userId }).lean()
            
                res.render('gestionRecettes', { 'recette':recettesData });

    },

}