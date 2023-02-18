const express = require('express')
const router = express.Router()
const index = require('./controllers/index')
const formulaire = require('./controllers/formulaire')
const inscription = require('./controllers/inscription')
const connexion = require('./controllers/connexion')
const gestion = require('./controllers/gestion')
const articles=require('./controllers/articles')
const description=require('./controllers/description')
const gestionRecettes=require('./controllers/gestionRecettes')


// -------------mes middleware---------------//
const multer= require('./middleware/multer')
const validUsers= require('./middleware/validUsers')
const validRecettes= require('./middleware/validRecettes')
const auth = require('./middleware/auth')
const admin = require('./middleware/admin')
const checkUsers=require('./middleware/checkUser')
const validConnexion=require('./middleware/validConnexion')

router.route('/')
    .get(index.get)

router.route('/formulaire')
    .get(auth,formulaire.get)
    .post(multer,validRecettes.validateRecettes,formulaire.post)

router.route('/updateRecettes/:id')
    .get(formulaire.get)
    .put(multer,validRecettes.validateRecettes,formulaire.put)
 
router.route('/delete/:id')
    .delete(formulaire.delete)

router.route('/deleteUser/:id')
    .delete(gestion.delete)

router.route ('/updateUser/:id')
    .get(inscription.get)
    .put(validUsers.validateUserUpdate,inscription.put) 
       

router.route('/inscription')
    .get(inscription.get)
    .post(validUsers.validateUserSignUp,inscription.post)


router.route('/connexion')
    .get(connexion.get)
    .post(validConnexion.validConnexion,connexion.post)


router.route('/gestion')
    .get(auth,admin,gestion.get)

router.route('/deleteCookie')
    .delete(connexion.deleteCookie)

router.route('/entrees')
    .get(articles.getEntrees)
    
router.route('/plats')
    .get(articles.getPlats)

router.route('/desserts')
    .get(articles.getDesserts)

 router.route('/description/:id')   
    .get(description.get)
    .post(description.post)
    
router.route('/deleteComment/:id')
    .delete(auth,checkUsers,description.deleteComment)

router.route('/gestionRecettes/')
    .get(gestionRecettes.get)

router.route('/updateComment/:id')
    .put(description.put)

module.exports = router