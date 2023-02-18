const carriersCollection = require('../models/carriersModel')

module.exports = {
    get: async (req, res) => {
        res.render('carriers')
    },
    getUpdate: async (req, res) => {
        const carriers = await carriersCollection.findOne({
            where: {
                id: req.params.id
            }, raw: true
        })
        res.render('carriers', { updateCarriers: true, 'carriers': carriers })
    },
    getCarriers: async (req, res) => {
        const carriers = await carriersCollection.findAll({ raw: true })
        res.render('carriersGestion', { 'carriers': carriers })
    },
    post: async (req, res) => {
        await carriersCollection.create({
            name: req.body.name,
            price: req.body.price,
            minWeight: req.body.minWeight,
            maxWeight: req.body.maxWeight
        })
        res.redirect("/");
    },
    put: async (req, res) => {

        await carriersCollection.update({
            name: req.body.name,
            price: req.body.price,
            minWeight: req.body.minWeight,
            maxWeight: req.body.maxWeight
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/carriersGestion')
    },
    delete: async (req, res) => {
        await carriersCollection.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('back')
    }
}