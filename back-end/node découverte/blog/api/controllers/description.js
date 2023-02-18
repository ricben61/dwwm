const recetteCollection = require('../models/recette');
const users = require('../models/users');
const commentaire=require('../models/commentaire');
const jwt = require('jsonwebtoken');



module.exports={
    get: async (req, res) => {
       
        
        const collection = await recetteCollection.findById(req.params.id).lean()
        const commentData = await commentaire.find({"recetteId": req.params.id}).lean()

        res.render('description', { 'recette': collection, comment: commentData,   })

      
                         
    },
    post: async (req, res) => {
 
     console.log(req.params.id)
      //on recupere l'element token des cookies pour pouvoir le dechiffrer  
        const token = req.cookies.token
      
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //    on crée des constantes pour pour dechifrer et trouver le bon utilisateur
       const userId = decodedToken.userId;  
        const user =  await users.findById(userId).lean()
        
           let newCommentaire= new commentaire({
               description: req.body.description,
               userId: userId,
               userName:user.name,
               recetteId: req.params.id,
                             
           })
             newCommentaire.save().then(
                () => {
                    res.redirect("/description/" + req.params.id);
                }
            ).catch(
                (error) => {
                    console.log(error.message);
                    res.redirect("back" );
                }
            )
    },
    
    put: async (req, res) => {

        const token = req.cookies.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const commentId = await commentaire.findById(req.params.id).lean()
        const role = decodedToken.role

        if(role === "Admin"  || role === "Moderateur"){
            await commentaire.findByIdAndUpdate(req.params.id, {
                description: req.body.description,     
             })
             res.redirect('back')
        }
        else{
        if (userId === commentId.userId ) {

            await commentaire.findByIdAndUpdate(req.params.id, {

               description: req.body.description,
                
            })
            res.redirect('back')
        } else {
            res.redirect('back')
        }
      }
    },
    deleteComment: async (req, res) => {
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const commentId = await commentaire.findById(req.params.id).lean()
        const role = decodedToken.role

        if(role === "Admin"  || role === "Moderateur"){
            await commentaire.findByIdAndDelete(req.params.id)
             res.redirect('back')
        }

        else{
        if (userId === commentId.userId ) {

            await commentaire.findByIdAndDelete(req.params.id)
            res.redirect('back')
        } else {
            res.redirect('back')
        }
      }
  
    },
}
