import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    name: { type: String, require: true },
    quantity: { type: Number, require: true },
})

const Product = mongoose.model('products', productSchema)
export default Product
