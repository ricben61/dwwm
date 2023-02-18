const mongoose = require('mongoose');

const recetteSchema = mongoose.Schema({
    categorie:{
        type: String,
        required: [true, "La catégorie est requise"]
    },
    titre: {
        type: String,
        required: [true, "Le titre est requis"],
       
    },
    recetteId: {
        type: String,
        
       
    },
    description:  {
        type : String,
        required: [true, "La recette est requise"]
    },
    
    img:{
        type: String,
        required: [true, "une image est requise"]
    },
    userId:{
        type:String,
    }
},
    
{ timestamps: true });

module.exports = mongoose.model('recettes',recetteSchema);