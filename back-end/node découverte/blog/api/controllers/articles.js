
const recettes = require('../models/recette');



module.exports = {
    getEntrees: async (req, res) => {

        let dataEntrees = await recettes.find({ "categorie": "Entrée" }).lean().exec((err, entreesData) => {
            if (entreesData) {
                res.render('article', {data:entreesData, viewTitle: "Liste des entrées" });
        }
    }
);
        // console.log(dataEntrees);
    },
    getPlats: async(req, res) => {

        let dataPlats = await recettes.find({ "categorie": "Plat" }).lean().exec((err, platsData) => {
            if (platsData) {
                res.render('article', {data:platsData, viewTitle: "Liste des plats" });
        }
    }
);
        // console.log(data);

    },
    getDesserts: async (req, res) => {

        let dataDesserts = await recettes.find({ "categorie": "Dessert" }).lean().exec((err, dessertsData) => {
            if (dessertsData) {
                res.render('article', { data: dessertsData, viewTitle: "Liste des desserts" });
            }
        }
        );
        // console.log(data);
    }



}