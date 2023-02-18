const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
   orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
   }], 
   shippingAddress1: {
    type: String,
    required: true,
   },
   shippingAddress2: {
    type: String,
    },
   city: {
    type: String,
    required: true
    },
   zip: {
    type:String,
    required: true
    },
   country: {
    type: String,
    required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "En attente"
    },
    totalPrice: {
        type: Number,
      
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})

orderSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
})


// Bocar: Ne pas oublier que ce sont les id qui sont les réf des relations et non le nom des pdts ou de l'utilisateur 
// 2: Ne pas oublier la liaison entre orderItem et Product :) 


exports.Order = mongoose.model('Order', orderSchema)