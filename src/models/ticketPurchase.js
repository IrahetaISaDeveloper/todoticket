/*CAMPOS
    customerId,
    quantity,
    purchaseDate,
    total,
    paymentStatus,
    transactionId
*/

import {Schema, model} from "mongoose";

const ticketPurchaseSchema = new Schema({
    customerId:{
        type: mongoose.Types.objectId,
        ref:"Customer"
    },
    quantity:{type: String},
    purchaseDate:{type: Date},
    total:{type: Number},
    paymentStatus:{type: Boolean},
    transactionId:{type: String},
},{
    timestamps: true,
    strict: false
})

export default model ("ticketPurchase", ticketPurchaseSchema)