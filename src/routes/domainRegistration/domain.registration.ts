import express, { Request, Response } from 'express';
import { DomainAvailability } from './domain.dto';

const domainRoutes = express.Router();

/**
 * @swagger
 * /domain/check/{domainName}:
 *   get:
 *     summary: Check domain availability(mock)
 *     description: Check if a domain name is available for registration.
 *     tags:
 *      - Domain
 *     parameters:
 *       - in: path
 *         name: domainName
 *         required: true
 *         schema:
 *           type: string
 *         description: The domain name to check availability for.
 *     responses:
 *       200:
 *         description: Successful response with availability status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 domainName:
 *                   type: string
 *                 available:
 *                   type: boolean
 */
domainRoutes.get(
    '/check/:domainName',
    (req: Request<DomainAvailability>, res: Response) => {
        const { domainName } = req.params;
        const isAvailable = Math.random() < 0.5;
        res.json({ domainName, available: isAvailable });
    }
);

/**
 * @swagger
 * /domain/register:
 *   post:
 *     summary: Register a domain(mock)
 *     description: Register a new domain name.
 *     tags:
 *      - Domain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - domainName
 *               - registrant
 *             properties:
 *               domainName:
 *                 type: string
 *               registrant:
 *                 type: string
 *     responses:
 *       201:
 *         description: Domain registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 domainName:
 *                   type: string
 *                 registrant:
 *                   type: string
 *                 registrationDate:
 *                   type: string
 *                   format: date-time
 *                 expirationDate:
 *                   type: string
 *                   format: date-time
 */
domainRoutes.post('/register', (req, res) => {
    const { domainName, registrant } = req.body;
    const registrationDetails = {
        domainName,
        registrant,
        registrationDate: new Date(),
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };
    res.status(201).json(registrationDetails);
});

export default domainRoutes;
