function errorHandler(err, req, res, next){
    if(err.name){
        res.status(401).json({message: "L'utilisateur n'est pas authorisé"})
    }
    // Erreur si la validation est pas bonne 
    if(err.name === "ValidationError"){
        res.status(401).json({message: err})
    }
    // Erreur par défaut 
    return res.status(500).json(err)
}

module.exports = errorHandler