const users= require ('../models/users');
const recetteCollection = require('../models/recette');
const commentaire=require('../models/commentaire');



module.exports={
    get: async  (req, res) => {
        // console.log(req.auth);
      await users.find(req.params.id).lean().exec((err, usersData) => {
            if (usersData) {
                res.render('gestion', {data:usersData });
        }
    }

)},


    delete: async (req, res) => {
       await users.findByIdAndDelete(req.params.id)
       await commentaire.deleteMany({userId:req.params.id})
       await recetteCollection.deleteMany({userId:req.params.id})

       if (res.locals.role === "User" || res.locals.role ==="Mod") {
        res.clearCookie('token');
       return res.redirect('/')
    }
      res.redirect('back')
        }


}
