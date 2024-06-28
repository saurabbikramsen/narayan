import express, { Request, Response } from 'express';
import { error } from 'console';
import { body, query, validationResult } from 'express-validator';
import User from '../../models/User';
import { CreateUser, PathParam } from './userDto';

const userRoutes = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
userRoutes.get('/', async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.send(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a user to the database
 *     tags:
 *      - Users
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - phone
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              phone:
 *                type: number
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
userRoutes.post(
    '/',
    [
        body('name').isString().isLength({ min: 5 }).trim(),
        body('email').isEmail().trim(),
        body('password').isString().isLength({ min: 8 }).trim(),
        body('phone').isNumeric().isLength({ min: 9 }).trim(),
    ],
    async (req: Request<PathParam, any, CreateUser>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const alreadyPresent = await User.findOne({
                email: req.body.email,
            });
            if (alreadyPresent) throw error('user already present');
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user details in the database
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - phone
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              phone:
 *                type: number
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
userRoutes.put(
    '/:id',
    [
        body('name')
            .isString()
            .isLength({ min: 5 })
            .trim()
            .withMessage('name should be string of more than 5 characters'),
        body('email').isEmail().trim().withMessage('email is invalid'),
        body('password')
            .isString()
            .isLength({ min: 8 })
            .trim()
            .withMessage('password must be at least 8 characters'),
        body('phone')
            .isNumeric()
            .isLength({ min: 9 })
            .trim()
            .withMessage('phone should be number and at least 9 characters'),
        query('id')
            .isString()
            .isLength({ min: 5 })
            .trim()
            .withMessage('id should be string at least 5 characters'),
    ],
    async (req: Request, res: Response) => {
        try {
            console.log('body: ', req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({ errors: errors.array() });
            }
            const alreadyPresent = await User.findOne({
                _id: req.params.id,
            });
            console.log(alreadyPresent);
            if (!alreadyPresent) throw error('user not present');
            const user = await User.findOneAndUpdate(
                { _id: req.query.id },
                req.body
            );
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user for the given id
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update.
 *     responses:
 *       200:
 *         description: deletion message.
 */
userRoutes.delete(
    '/:id',
    [query('id').isString().isLength({ min: 5 }).trim()],
    async (req: Request<PathParam>, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw error(errors.array());
            }
            const alreadyPresent = await User.findOne({
                _id: req.params.id,
            });
            console.log(alreadyPresent);
            if (!alreadyPresent) throw error('user not present');
            await User.deleteOne({ _id: req.query.id });
            res.status(200).send({ message: 'deleted successfully' });
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

export default userRoutes;
