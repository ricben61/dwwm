const {Order} = require ('../models/order')
const {OrderItem} = require('../models/order-item')
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res)=>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1}); 

    if(!orderList){
        res.status(500).json({success: false})
    }

    res.send(orderList);
})

router.get(`/:id`, async (req, res)=>{
    const order = await Order.findById(req.params.id)
   // À optimiser par la suite, pas très bon de réutiliser populate 2x
    .populate('user', 'name')
    .populate({
        path: 'orderItems', populate: {
            path:'product', populate: 'category' }
    })

    if(!order){
        res.status(500).json({success: false})
    }

    res.send(order);
})

router.post('/', async (req, res) =>{
    // Pour palier à l'obstacle concernant la récupération des quantités je suis obligé de passer directement
   // Par la BDD et map pour récupérer les infos et non par la req.body.orderItems
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id
    }))
    // Pour résoudre la promesse 
    const orderItemsIdsResolved = await orderItemsIds;
    // console.log(orderItemsIds)

  // Pour sécurisé les prix et ne pas récupérer les prix directement via le front,
  // Je suis obligé de le sécuriser pour ne pas altéré par ex, si l'utilisateur modifie via le Front le prix total de la commande
  // Je créé donc une const qui va récupérer dans la BDD qui est notre source de vérité
  // Les informations du produit pour pouvoir faire mon calcul par la suite

  // En terme de sécurité, cette promesse est très importante! (L. 54 à 61 )
  
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) =>{

        const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a + b, 0)

        // console.log(totalPrices);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();
   
    if(!order)
    return res.status(404).send('La commande ne peut pas être créée')

    res.send(order)
});


router.put('/:id', async (req,res) =>{
    const order = await Order.findByIdAndUpdate(
    req.params.id,{
       status: req.body.status
    },
    {new: true}
    )
    
    if(!order)
    return res.status(400).send('La commande ne peut pas être mise à jour')

    res.send(order)
})

// Attention la supression de la commande NE SUPPRIME PAS LA COLLECTION orderItems !!! 
router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(order => {
        if(order){
            return res.status(200).json({success: true, message: "La commande a bien été supprimé"})
        } else{
            return res.status(404).json({success: false, message:"Commande inconnue"})
        }
    }).catch(err =>{
        return res.status(400).json({success: false, error: err})
    })
    })

// Pour mes tests, exemple de commande: 

// {
//     "orderItems": [
//         {
//             "quantity":3,
//             "product": ""// Je vais récupérer un ID product
//         },
//         {
//             "quantity": 2,
//             "product": ""// Je vais récupérer un 2e ID product
//         }
//     ],
//     "shippingAddress1": "Square Vesoul",
//     "shippingAddress2": "15",
//     "city": "Paris",
//     "zip": "75001",
//     "country": "France",
//     "phone": "+33707070707",
//     "user": "" // Je récupère l'ID d'un utilisateur
// }

// Petit bonus: Je me suis ajouté une route, me permettant d'avoir les ventes totales sur mon site
// Très utile pour faire des statistiques ou pour alimenter mon panneau d'administration


// J'utilise les méthodes intégrées à mongoose pour calculer ma variable totalPrice
router.get('/get/totalsales', async (req, res)=>{
    const totalSales = await Order.aggregate([
        // Attention: Si je ne mets pas _id à null ça ne marche pas, car mongoDB renvoie toujours un ID automatiquement!
        { $group: {_id: null, totalSales: {$sum: '$totalPrice'}}}
    ])

    if(!totalSales){
        return res.status(400).send('Les ventes totales ne peuvent pas être générées!')
    }

    res.send({ totalsales: totalSales.pop().totalSales})
})

router.get(`/get/count`, async (req, res)=>{
    const orderCount = await Order.countDocuments()

    if(!orderCount){
        res.status(500).json({success: false})
    }

    res.send({
       orderCount: orderCount
    });
})

router.get(`/get/userorders/:userid`, async (req, res)=>{
    const userOrderList = await Order.find({user: req.params.userid})
    .populate({
        path: 'orderItems', populate: {
            path:'product', populate: 'category' }
    }).sort({'dateOrdered': -1}); 

    if(!userOrderList){
        res.status(500).json({success: false})
    }

    res.send(userOrderList);
})

module.exports = router;