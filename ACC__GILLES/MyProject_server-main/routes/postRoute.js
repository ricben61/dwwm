const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth")

//création d'un post
router.post("/new", auth, async(req, res)=> {
    try {
        //on stocke les valeurs récupérées dans le body de la reqsuête, envoyées depuis le front, dans un objet de type Post
        const post = new Post(req.body);
        //on persiste le post dans la bdd. La méthode save() nous retourne une copie de post, stockée dans newPost
        const newPost = await post.save();
        console.log(req.body);
        console.log("création réussie");
        //on envoie une réponse vers le front pour dire que tout s'est bien passé, ainsi que le post lui même, stocké dans la réponse
        return res
            .status(201)
            .json({message: `l'article ${newPost.title} a été créé`, status: 201, post: newPost});
    
        } catch(error) {
        return res
            .status(500)
            .json({message: error.message, status: 500})
    }
    }
);

//récupérer tous les posts
router.get("/", async(req, res) => {
    try {
        const result = await Post.find().sort("-createdAt");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

//récupérer un post par son id
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.json(error.message)
    }
})

//supprimer un post
router.delete("/delete/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({statut: 404, message: "cet article n'existe pas"});
        }
        //todo si on veut que seul l'auteur puisse supprimer son article c'est ici qu'il faut mettre une condition de test
        await post.remove();
        return res
        .status(200).json({statut: 200, message: "article supprimé"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//mettre à jour un post
router.put("/update/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({statut: 404, message: "cet article n'existe pas"});
        }
        //todo si on veut que seul l'auteur puisse mettre à jour son article c'est ici qu'il faut mettre une condition de test. Ici cette sécurisation a été mise en place côté front (voire client\src\app\components\edit-user\edit-user.component.ts)
        await post.updateOne(req.body);
        return res
        .status(200).json({statut: 200, message: "article mis à jour"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;