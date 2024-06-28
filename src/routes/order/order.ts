import express, { Request, Response } from 'express';
import Order from '../../models/Order';
import { body, param, validationResult } from 'express-validator';
import { CreateOrder, UpdateOrder } from './order.dto';
import { PathParam } from '../user/userDto';
import { error } from 'console';

const orderRoutes = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of orders
 *     tags:
 *      - Orders
 *     description: Retrieve a list of orders from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of orders.
 */
orderRoutes.get('/', (req, res) => {
    const orders = Order.find();
    res.send(orders);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a order to the database
 *     tags:
 *      - Orders
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - productId
 *              - orderedBy
 *              - productName
 *              - quantity
 *            properties:
 *              productId:
 *                type: string
 *              orderedBy:
 *                type: string
 *              productName:
 *                type: string
 *              quantity:
 *                type: number
 *     responses:
 *       201:
 *         description: added order details.
 */
orderRoutes.post(
    '/',
    [
        body('productId').isString().isLength({ min: 5 }).trim(),
        body('orderedBy').isString().isLength({ min: 3 }).trim(),
        body('productName').isString().isLength({ min: 2 }).trim(),
        body('quantity').isNumeric().isLength({ min: 1 }).trim(),
    ],
    async (req: Request<PathParam, any, CreateOrder>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const product = await Order.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

/**
 * @swagger
 * /orders:
 *   put:
 *     summary: Update order details in the database
 *     tags:
 *      - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - productId
 *              - orderedBy
 *              - productName
 *              - quantity
 *            properties:
 *              productId:
 *                type: string
 *              orderedBy:
 *                type: string
 *              productName:
 *                type: string
 *              quantity:
 *                type: number
 *     responses:
 *       200:
 *         description: updated order data.
 */
orderRoutes.put(
    '/:id',
    [
        body('productId').isString().isLength({ min: 5 }).trim(),
        body('orderedBy').isString().isLength({ min: 3 }).trim(),
        body('productName').isString().isLength({ min: 2 }).trim(),
        body('quantity').isNumeric().isLength({ min: 1 }).trim(),
    ],
    async (req: Request<PathParam, any, UpdateOrder>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({ errors: errors.array() });
            }
            const alreadyPresent = await Order.findOne({
                _id: req.params.id,
            });
            if (!alreadyPresent) throw error('order not present');
            const product = await Order.findOneAndUpdate(
                { _id: req.params.id },
                req.body
            );
            res.status(200).json(product);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Delete a order for the given id
 *     tags:
 *      - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the oder to delete.
 *     responses:
 *       200:
 *         description: deletion message.
 */
orderRoutes.delete(
    '/:id',
    [param('id').isString().isLength({ min: 5 }).trim()],
    async (req: Request<PathParam>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw error(errors.array());
            }
            const alreadyPresent = await Order.findOne({
                _id: req.params.id,
            });
            if (!alreadyPresent) throw error('order not present');
            await Order.deleteOne({ _id: req.params.id });
            res.status(200).send({ message: 'deleted successfully' });
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

/**
 * @swagger
 * /orders/track/{trackingNumber}:
 *   get:
 *     summary: Get shipment tracking information(mock)
 *     description: Retrieve the current status and details of a shipment by its tracking number.
 *     tags:
 *      - Orders
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The tracking number of the shipment to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with tracking information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trackingNumber:
 *                   type: string
 *                 status:
 *                   type: string
 *                   description: Current status of the shipment.
 *                 location:
 *                   type: string
 *                   description: Current location of the shipment.
 *                 estimatedDelivery:
 *                   type: string
 *                   format: date
 *                   description: Estimated delivery date of the shipment.
 *       404:
 *         description: Shipment with the specified tracking number not found.
 */
orderRoutes.get('/track/:trackingNumber', (req, res) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    const formattedDate = currentDate.toISOString().split('T')[0];
    const { trackingNumber } = req.params;
    const trackingInfo = {
        trackingNumber,
        status: 'In transit',
        location: 'mumbai wareHouse ',
        estimatedDelivery: formattedDate,
    };

    res.json(trackingInfo);
});

export default orderRoutes;
