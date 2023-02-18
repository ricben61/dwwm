const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth")


//création d'un user ou inscription
router.post("/register", async(req, res)=> {
    try {
        const searchUser = await User.findOne({email: req.body.email});
        if(searchUser) {
            console.log("utilisateur existant")
            return res
                .status(403)
                .json({message: `L'utilisateur ${searchUser.email} existe déjà`, status: 403});
        }
        //on injecte les données recueillies dans le body de la requête dans un objet de type user
        const user = new User(req.body);
        //on persiste les données
        const newUser = await user.save();
        console.log("création réussie");
        //on envoie un message dans la réponse
        return res
            .status(201)
            .json({message: `l'utilisateur ${newUser.login} a été créé`, status: 201});
    } catch(error) {
        return res
            .status(500)
            .json({message: error.message, status: 500})
    }
    }
);

// connexion
router.post("/login", async(req, res) => {
    try{
        //dans le body on va retrouver email et pwd
        //! récupérer le user grâce à son email
        //! vérifier s'il existe
        //! vérifier le pwd
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res
            .status(400)
            .json({message: "cet utilisteur n'existe pas", statut: 400})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch) {
            return res
            .status(400)
            .json({message: "mot de passe incorrect", status: 400});
        }
        //les informations qui seront présentes dans le token
        //! ne pas mettre ici d'informations trop confidentielles car elles seront envoyées vers le front et pourront être potentiellement décryptées
        const payload = {
            _id: user._id,
            login: user.login,
            email: user.email,
            isAdmin: user.isAdmin
        }
        //on encrypte le token à envoyer vers le front
        const token = jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '2hours'});
        
        //on envoie le token et les informations sur le user (non confidentielles) vers le front. Envoyer ces informations permettra d'y accéder plus facilement sans avoir besoin de refaire une requête pour les obtenir à nouveau.
        return res
        .status(200)
        .json({message: {
            token: token,
            user: {
            email: user.email,
            login: user.login,
            userId: user._id,
            admin: user.isAdmin,
        }
        }});
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
})

//récupération de tous les users
router.get("/", auth, async(req, res) => {
    try {
        //! cette route contient une condition qui permet de tester si l'utilisateur qui l'appelle a le role admin. Elle doit être associé à auth, donné en argument à la méthode.
        if(!req.payload.isAdmin) {
            return res.status(403).json("Vous n'êtes pas autorisé")
        }
        const userList = await User.find().sort("login");
        res.status(200).json(userList)
    } catch (error) {
        res.json(error.message)
    }
})

//récupération d'un user par son id
router.get("/:id", auth, async(req, res) => {
    try {
        //! cette route contient une condition qui permet de tester si l'utilisateur qui l'appelle a le role admin. Elle doit être associé à auth, donné en argument à la méthode.
        if(!req.payload.isAdmin) {
            console.log("demande non autorisée");
            return res.status(403).json("Vous n'êtes pas autorisé")
        }
        const user = await User.findById(req.params.id);
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        res.json(error.message)
    }
})

//mise à jour d'un user
//! attention cette méthode ne prévoit pas la modification de l'email :
// ! si on désire modifier l'email, il faudrait vérifier au préalable s'il existe déjà dans la bdd
router.put("/update/:id", auth, async(req, res) => {
    try {
        //! cette route contient une condition qui permet de tester si l'utilisateur qui l'appelle a le role admin.
        //!  Elle doit être associé à auth, donné en argument à la méthode.
        if(!req.payload.isAdmin) {
            return res.status(403).json("Vous n'êtes pas autorisé")
        }
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({statut: 404, message: "cet utilisateur n'existe pas"});
        }
        await user.updateOne(req.body);
        return res
        .status(200).json({statut: 200, message: "utilisateur mis à jour"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;