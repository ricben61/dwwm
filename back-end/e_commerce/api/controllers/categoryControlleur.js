const Category = require("../models/categoryModel");



module.exports = {
    get: (req, res) => {
        res.render('category_create')
    },
    post: async (req, res) => {
        await Category.create({
            name: req.body.categorie
        });

        res.render('category_create')
    },
    read: async (req, res) => {
        const categories = await Category.findAll();

        // console.log(categories);
        res.render('category_list', { categories })
    },
    update: async (req, res) =>{
        
    }
}