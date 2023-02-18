const products = require('../models/productModel');
const fs = require('fs');
const Category = require('../models/categoryModel');

module.exports = {
    get: async (req, res) => {
        const dataProducts = await products.findAll({
            include:Category,
            raw: true,
            nest:true
        })
        console.log(dataProducts);
        res.render('products', { dataProducts })
    },
    getForm: async (req, res) => {

        const dataProducts = await products.findByPk(req.params.id,{raw:true})
        const categories =await Category.findAll({raw:true})
            
        res.render('form_product',{dataProducts,categories})
    },
    post: async (req, res) => {
        // console.log(req.body);
        await products.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            isBest: req.body.isBest,
            quantity: req.body.quantity,
            categoryId:req.body.categoryId,
            // imageUrl: req.file.filename,
            weight: req.body.weight,
        })
        res.redirect('products')
    }, 
    put: async (req, res) => {
        // console.log(req.body);
        await products.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            isBest: req.body.isBest,
            quantity: req.body.quantity,
            imageUrl: req?.file?.filename,
            categoryId:req.body.categoryId,
            weight: req.body.weight
        }, {
            where: {
                id:req.params.id
            }
        })
        console.log(req.body);
        res.redirect('/products')
    },
    delete: async (req, res) => {
        await products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('back')
    }

}
