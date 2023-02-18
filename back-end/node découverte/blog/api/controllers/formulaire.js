const recetteCollection = require('../models/recette');
const fs = require('fs')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const commentaire = require('../models/commentaire');


module.exports = {

    get: async (req, res) => {
        if (req.params.id) {
            const collection = await recetteCollection.findById(req.params.id).lean()
            // console.log(collection);
            res.render('formulaire', { updateRecettes: true, 'recette': collection })
        } else {
            res.render('formulaire')
        }
    },
    post: async (req, res) => {
        const errors = validationResult(req)
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //    on crée des constantes pour pour dechifrer et trouver le bon utilisateur
        const userId = decodedToken.userId;
        const user = await users.findById(userId).lean()

        if (!errors.isEmpty()) {

            let body = req.body;
            let get = { categorie: body.categorie, titre: body.titre, description: body.description }

            return res.status(422).render('formulaire', { errors: errors.array(), get: get });
        }
        if (req.file === undefined) {
            new recetteCollection({
                categorie: req.body.categorie,
                titre: req.body.titre,
                description: req.body.description,
                userId: userId,
                img: "../../public/images/desserts.jpg"
            }).save().then(
                () => {
                    res.redirect("/");
                }
            ).catch(
                (error) => {
                    console.log(error.message);
                    res.redirect("back");
                }
            )
        } else {
            new recetteCollection({
                categorie: req.body.categorie,
                titre: req.body.titre,
                description: req.body.description,
                userId: userId,
                img: req.file.filename
            }).save().then(
                () => {
                    res.redirect("/");
                }
            ).catch(
                (error) => {
                    console.log(error.message);
                    res.redirect("back");
                }
            )
        }
    },
    put: async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const recette = await recetteCollection.findById(req.params.id).lean()
            return res.status(422)
            .render('formulaire', { errors: errors.array(), updateRecettes: true, 'recette': recette });
        }

        if (req.file === undefined) {
            await recetteCollection.findByIdAndUpdate(req.params.id, {
                categorie: req.body.categorie,
                titre: req.body.titre,
                description: req.body.description,
                img: req.body.img
            })
            res.redirect('/')
        } else {
            const find = await recetteCollection.findById(req.params.id).lean()

            fs.unlink(`assets/images/${find.img}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            await recetteCollection.findByIdAndUpdate(req.params.id, {
                categorie: req.body.categorie,
                titre: req.body.titre,
                description: req.body.description,
                img: req.file.filename
            })
            res.redirect('/')
        }
    },

    delete: async (req, res) => {

        const find = await recetteCollection.findById(req.params.id).lean()

        fs.unlink(`assets/images/${find.img}`, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        await recetteCollection.findByIdAndDelete(req.params.id);
        await commentaire.deleteMany({ recettesId: req.params.id })


        res.redirect('back')
    }



}





