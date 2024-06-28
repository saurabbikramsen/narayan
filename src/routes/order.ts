import express from 'express';
import Order from '../models/Order';

const orderRoutes = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of orders
 *     description: Retrieve a list of orders from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of orders.
 */
orderRoutes.get('/', (req, res) => {
    const orders = Order.find();
    res.send(orders);
});

export default orderRoutes;
