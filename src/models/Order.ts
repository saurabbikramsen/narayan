import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    productId: { type: String, require: true },
    productName: { type: String, require: true },
    orderedBy: { type: String, require: true },
    quantity: { type: Number, require: true },
})

const Order = mongoose.model('orders', orderSchema)
export default Order
