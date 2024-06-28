import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { CreateProduct, UpdateProduct } from './product.dto';
import { error } from 'console';
import Product from '../../models/Product';
import { PathParam } from '../user/userDto';

const productRoutes = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *      - Products
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a product to the database
 *     tags:
 *      - Products
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - quantity
 *            properties:
 *              name:
 *                type: string
 *              quantity:
 *                type: number
 *     responses:
 *       200:
 *         description: added product detail.
 */
productRoutes.post(
    '/',
    [
        body('name').isString().isLength({ min: 5 }).trim(),
        body('quantity').isNumeric().isLength({ min: 1 }).trim(),
    ],
    async (req: Request<PathParam, any, CreateProduct>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const alreadyPresent = await Product.findOne({
                email: req.body.name,
            });
            if (alreadyPresent) throw error('product already present');
            const product = await Product.create(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

/**
 * @swagger
 * /products:
 *   put:
 *     summary: Update product details in the database
 *     tags:
 *      - Products
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
 *              - name
 *              - quantity
 *            properties:
 *              name:
 *                type: string
 *              quantity:
 *                type: number
 *     responses:
 *       200:
 *         description: updated product data.
 */
productRoutes.put(
    '/:id',
    [
        body('name')
            .isString()
            .isLength({ min: 5 })
            .trim()
            .withMessage('name should be string of more than 5 characters'),
        body('quantity')
            .isNumeric()
            .isLength({ min: 1 })
            .trim()
            .withMessage('phone should be number and at least 9 characters'),
        param('id')
            .isString()
            .isLength({ min: 5 })
            .trim()
            .withMessage('id should be string at least 5 characters'),
    ],
    async (req: Request<PathParam, any, UpdateProduct>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({ errors: errors.array() });
            }
            const alreadyPresent = await Product.findOne({
                _id: req.params.id,
            });
            if (!alreadyPresent) throw error('product not present');
            const product = await Product.findOneAndUpdate(
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
 * /products:
 *   delete:
 *     summary: Delete a product for the given id
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update.
 *     responses:
 *       200:
 *         description: deletion message.
 */
productRoutes.delete(
    '/:id',
    [param('id').isString().isLength({ min: 5 }).trim()],
    async (req: Request<PathParam>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw error(errors.array());
            }
            const alreadyPresent = await Product.findOne({
                _id: req.params.id,
            });
            if (!alreadyPresent) throw error('product not present');
            await Product.deleteOne({ _id: req.params.id });
            res.status(200).send({ message: 'deleted successfully' });
        } catch (error) {
            res.status(400).send(error);
        }
    }
);
