import express from 'express';
import asyncHandler from 'express-async-handler';
import Client from '../models/ClientModel';

const router = express.Router();

// GET - /api/clients (all clients)
router.get('/', async (req, res) => {
    try {
        let limit = 0;
        if (req.query.limit !== undefined) {
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
        const clients = await Client.findOne({ id: req.params.id });
        res.status(200).json(clients);
    } catch (err) {
        handleError(res, err.message);
    }
});

// POST - /api/clients (creaate new client)
// prettier-ignore
router.post('/', asyncHandler(async (req, res) => {
    let data = req.body;
    if (req.body.id === undefined){
        data = {...data, id: Number(await Client.countDocuments()) + 1}
    }

    let client = await Client.create(data);
    res.status(201).json(client);
}));

// PUT - /api/clients/:id (update existing client)
// prettier-ignore
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    let client = await Client.update(req.body);
    res.status(201).json(client);
}));

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
