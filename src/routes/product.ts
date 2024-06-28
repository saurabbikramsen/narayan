import express from 'express';
import Order from '../models/Order';
import Product from '../models/Product';

const productRoutes = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of products.
 */
productRoutes.get('/', (req, res) => {
    const products = Product.find();
    res.send(products);
});

export default productRoutes;
