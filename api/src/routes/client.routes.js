import express from 'express';
// import asyncHandler from 'express-async-handler';
import Client from '../models/ClientModel';

const router = express.Router();

// GET - /api/clients (all clients)
router.get('/', async (req, res) => {
    try {
        let limit = 0;
        if (req.query.limit != undefined) {
            limit = Number(req.query.limit);
        }
        const clients = await Client.find()
            .sort({ id: 1 })
            .limit(limit);
        res.status(200).json(clients);
    } catch (err) {
        handleError(res, err.message);
    }
});

// GET - /api/clients/:id (single client)
router.get('/:id', async (req, res) => {
    try {
        const clients = await Client.findOne(req.body.id);
        res.status(200).json(clients);
    } catch (err) {
        handleError(res, err.message);
    }
});

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
    return res.send(500, err);
}

export default router;
