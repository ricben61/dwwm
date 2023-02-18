const express = require('express')
const router = express.Router()


// -------------controller---------------------------
const home = require('./controllers/homeController')
const productController=require('./controllers/productController')
const userController = require('./controllers/userController');
const carriers = require('./controllers/carriersController')
const categoryControlleur = require('./controllers/categoryControlleur');



// --------------------midllewares------------
const multer = require('./middlewares/multer');





router.route('/')
    .get(home.get)

router.route('/carriers')
    .get(carriers.get)
    .post(carriers.post)

router.route('/carriers/:id')
    .get(carriers.getUpdate)
    .put(carriers.put)

router.route('/carriersGestion')
    .get(carriers.getCarriers)

router.route('/carriersDelete/:id')
    .delete(carriers.delete)  

router.route('/products')
    .get(productController.get)
    

router.route('/form-products')
    .get(productController.getForm)
    .post(productController.post)


router.route('/updateProducts/:id')
    .get(productController.getForm)
    .put(productController.put)

router.route('/deleteProducts/:id')
    .delete(productController.delete)

// routers 'user'
router.route('/user/register')
    .get(userController.get)
    .post(userController.post)

router.route('/user/update/:id')
    .get(userController.updateUser)
    .post(userController.update)

router.route('/user/list-users')
    .get(userController.getUsersList)

router.route('/user/delete/:id')
    .get(userController.delete);


router.route('/category-create')
    .get(categoryControlleur.get)
    .post(categoryControlleur.post)

router.route('/category-list')
    .get(categoryControlleur.read)
    .post(categoryControlleur.update)

module.exports=router
